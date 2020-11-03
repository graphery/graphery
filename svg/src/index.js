const NAME         = 'gySVGObject';
const NS           = 'http://www.w3.org/2000/svg';
const OBJECT       = 'object';
const FUNCTION     = 'function';
const STRING       = 'string';
const UNDEFINED    = 'undefined';
const EMPTY        = '';
const cache        = new WeakMap ();
const readonlyProp = new Set ();

/**
 * @typedef {Object} gySVGObject
 */

/**
 * gySVGObject
 */
class gySVGObject {
  constructor (element) {
    this._el = element;
  }
  
  get [ Symbol.toStringTag ] () {
    return NAME;
  }
  
  /**
   * el
   * @type {Object}
   */
  get el () {
    return this._el;
  }
  
  /**
   * @param {gySVGObject|Object|string} tag
   * @returns {gySVGObject}
   */
  add (tag) {
    let r = type (tag, STRING) ?
      create (tag) :
      isWrapped (tag) ?
        tag :
        wrapper (tag);
    this._el.appendChild (r._el);
    return r;
  }
  
  /**
   * @param {string|Object} tag
   * @returns {gySVGObject}
   */
  attachTo (tag) {
    const r = type (tag, OBJECT) ?
      (isWrapped (tag) ?
          tag._el :
          tag
      ) :
      document.querySelector (tag);
    r.appendChild (this._el);
    return this;
  }
  
  /**
   * gySVGObject.id()
   * @param {string} [value]
   * @returns {string|gySVGObject}
   */
  id (value) {
    if (!value) {
      return this._el.id || (this._el.id = randomId ());
    }
    this._el.setAttribute ('id', value);
    return this;
  }
  
  /**
   * gySVGObject.ref()
   * @returns {string}
   */
  ref () {
    return `#${ this.id () }`;
  }
  
  /**
   * gySVGObject.url()
   * @returns {string}
   */
  url () {
    return `url(#${ this.id () })`;
  }
  
  /**
   * @param {Object} attributes
   * @param {number} duration
   * @return {gySVGObject}
   */
  animateTo (attributes, duration = 200) {
    const animates = [];
    for (let attr of Object.keys (attributes)) {
      const animate = this.add ('animate')
        .attributeName (attr)
        .to (attributes[ attr ])
        .fill ('freeze')
        .dur (duration + 'ms');
      animate.beginElement ();
      animates.push (animate);
    }
    setTimeout (() => {
      for (let attr of Object.keys (attributes)) {
        this[ attr ] (attributes[ attr ]);
      }
      animates.forEach (e => {
        e.remove ();
      })
    }, duration + 10);
    return this;
  }
  
}

/**
 *
 * @param {object} o
 * @param {string} t
 * @returns {boolean}
 */
const type = (o, t) => typeof o === t;

/**
 *
 * @param {object} o
 * @param {object} p
 * @returns {boolean}
 */
const is = (o, p) => o instanceof p;

/**
 * randomId()
 * @returns {string}
 */
const randomId = () => NAME + Math.random ().toString (32).substring (2);

/**
 * isWrapped()
 * @param {*} el
 * @returns {boolean}
 */
const isWrapped = (el) => typeof el === OBJECT && el[ Symbol.toStringTag ] === NAME;

/**
 *
 * @param tag
 * @returns {gySVGObject}
 */
const create = (tag) => wrapper (document.createElementNS (NS, tag));

/**
 * return the original method name for an alias
 * @param {string} prop
 * @returns {string}
 */
const alias = (prop) => ({
  content  : 'innerHTML',
  source   : 'outerHTML',
  parent   : 'parentElement',
  next     : 'nextElementSibling',
  previous : 'previousElementSibling'
})[ prop ] || prop;

/**
 *
 * @param element
 * @returns {Proxy<gySVGObject>}
 */
const wrapper = (element) => {
  if (!type (element, OBJECT) || element === null) {
    return null;
  }
  if (cache.has (element)) {
    return cache.get (element);
  }
  const proxy = new Proxy (
    new gySVGObject (element),
    // Handler
    {
      get (wrapped, prop) {
        // Direct return
        if (['_call', '_el', 'el', Symbol.toStringTag].includes (prop)) {
          return wrapped[ prop ];
        }
        // Return the wrapper method
        if (!type (wrapped[ prop ], UNDEFINED)) {
          return (...args) =>
            pluginCallback (proxy, prop, args) ||
            wrapped[ prop ].call (proxy, ...args);
        }
        // Special case <path d=""></path>
        if (prop === 'd' && element.tagName.toLowerCase () === 'path') {
          let content  = EMPTY;
          const dProxy = new Proxy (
            (arg) =>
              pluginCallback (proxy, prop, [arg]) ||
              arg ? element.setAttribute ('d', arg) || proxy : element.getAttribute ('d'),
            {
              get (target, command) {
                return (...args) => {
                  content += `${ command }${ pluginCallback (
                    proxy,
                    prop,
                    args
                  ) || args.join (',') }`;
                  element.setAttribute (prop, content);
                  return dProxy;
                };
              }
            }
          );
          return dProxy;
        }
        prop = alias (prop);
        // Return the element method
        if (type (element[ prop ], FUNCTION)) {
          return (...args) => {
            const result =
                    pluginCallback (proxy, prop, args) ||
                    element[ prop ].call (element, ...args);
            return (
              result === undefined ?
                proxy :
                adaptedResult (result)
            );
          };
        }
        // Return the wrapped method
        return methodWrapper (element, prop, proxy);
      }
    }
  );
  cache.set (element, proxy);
  return proxy;
};

/**
 *
 * @param {Object} element
 * @param {string} prop
 * @param {Object} parentWrapper
 * @param {string} [parentProp]
 * @returns {Proxy<function()>}
 */
const methodWrapper = (element, prop, parentWrapper, parentProp) => {
  const propNormalized = prop.replace (/_/g, '-');
  const f              = (...args) => {
    const r = pluginCallback (parentWrapper, parentProp ? `${ parentProp }.${ prop }` : prop, args);
    if (r !== undefined) {
      return r;
    }
    // Get value
    if (args.length === 0) {
      const result = (
        propNormalized in element &&
        (!element.hasAttribute || !element.hasAttribute (propNormalized))
      ) ?
        element[ propNormalized ] :
        element.getAttribute (propNormalized);
      return adaptedResult (result);
    }
    // Set value as property
    const value = args[ 0 ];
    if (is (element, CSSStyleDeclaration)) {
      element[ propNormalized ] = value;
      return parentWrapper;
    }
    if (propNormalized in element && !readonlyProp.has (propNormalized)) {
      if (element[ propNormalized ] === value) {
        return parentWrapper;
      }
      const previousValue = element[ propNormalized ];
      try {
        element[ propNormalized ] = value;
      } catch (err) {
        readonlyProp.add (propNormalized);
      }
      if (
        (type (element[ propNormalized ], OBJECT) && element[ propNormalized ] === value) ||
        element[ propNormalized ] !== previousValue
      ) {
        return parentWrapper;
      }
      readonlyProp.add (propNormalized);
    }
    // Set value as attribute
    if (value !== 0 && !value) {
      element.removeAttribute (propNormalized);
    } else {
      element.setAttribute (propNormalized, String (args));
    }
    return parentWrapper;
  };
  // Object.defineProperty (f, 'name', {value : propNormalized, configurable : true});
  return new Proxy (
    f,
    {
      get (target2, prop2) {
        const result = element[ propNormalized ][ prop2 ];
        return (
          type (result, FUNCTION) ?
            (...args) => {
              const r =
                      pluginCallback (parentWrapper, `${ prop }.${ prop2 }`, args) ||
                      result.call (element[ propNormalized ], ...args);
              return r === undefined ? parentWrapper : r;
            } :
            methodWrapper (element[ propNormalized ], prop2, parentWrapper, propNormalized)
        );
      },
      set (target2, prop2, value2) {
        return element[ propNormalized ][ prop2 ] = value2;
      }
    }
  );
};

/**
 * adaptedResult
 * @param {*} result
 * @returns {*}
 */
const adaptedResult = (result) => {
  return (
    is (result, HTMLCollection) || is (result, NodeList) ?
      [...result].map (x => wrapper (x)) :
      is (result, SVGElement) ?
        wrapper (result) :
        type (result, STRING) ?
          Number.isNaN (Number (result)) ?
            result :
            Number (result) :
          result
  );
};

/**
 * pluginCallback
 * @param {Object} wrapped
 * @param {string} prop
 * @param {Array} args
 */
const pluginCallback = (wrapped, prop, args) => {
  if (wrapped._call) {
    return wrapped._call (wrapped, prop, args);
  }
};

/**
 * gySVGObject
 * @param {Object|gySVGObject|string} [el]
 * @returns {gySVGObject|Object|null}
 * @constructor
 */
export function gySVG (el) {
  pluginCallback (gySVG, EMPTY, [el]);
  if (type (el, OBJECT)) {
    return isWrapped (el) ? el : wrapper (el);
  }
  return create (el || 'svg');
}

export default gySVG;

/**
 * gySVG.isWrapped()
 * @type {function({Object}) : boolean}
 */
gySVG.isWrapped = isWrapped;

/**
 * gySVG.extend
 * @param {Function} plugin
 */
gySVG.extend = (plugin) => plugin (gySVG, gySVGObject);


