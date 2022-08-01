const NAME         = 'gySVGObject';
const NS           = 'http://www.w3.org/2000/svg';
const SVG          = 'svg';
const OBJECT       = 'object';
const FUNCTION     = 'function';
const STRING       = 'string';
const BOOLEAN      = 'boolean';
const UNDEFINED    = 'undefined';
const SYMBOL       = 'symbol';
const PATH         = 'path';
const ANIMATE      = 'animate';
const FILL         = 'none';
const FREEZE       = 'freeze';
const D            = 'd';
const TRANSFORM    = 'transform';
const ROTATE       = 'rotate';
const TRANSLATE    = 'translate';
const OFFSET       = 'offset';
const INHERIT      = 'inherit';
const FINISHED     = 'finished';
const EMPTY_STRING = '';
const COMA         = ',';
const DEG_TYPES    = [ROTATE, 'skewX', 'skewY'];
const DEG          = 'deg';
const PX           = 'px';
const MS           = 'ms';
const cache        = new WeakMap();
const readonlyProp = new Set();

/**
 * Reduce Motion flag
 * @type {boolean}
 */
let reduceMotion = false;
if (window.matchMedia) {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  reduceMotion     = mediaQuery.matches;
  mediaQuery.addEventListener('change', () => {
    reduceMotion = mediaQuery.matches;
  });
}

/**
 * Check if is direct access member
 * @param {string} prop
 * @returns {boolean}
 */
const directAccess = (prop) => 'el' === prop || prop[0] === '_' || isType(prop, SYMBOL);

/**
 * Check the type
 * @param {object} o
 * @param {string} t
 * @returns {boolean}
 */
const isType = (o, t) => typeof o === t;

/**
 * Check the instance
 * @param {object} o
 * @param {object} p
 * @returns {boolean}
 */
const is = (o, p) => o instanceof p;


/**
 * Create a random id
 * @returns {string}
 */
const randomId = () => NAME + Math.random().toString(32).substring(2);

/**
 * Check if the element is wrapped or not
 * @param {*} el
 * @returns {boolean}
 */
const isWrapped = (el) => isType(el, OBJECT) && el !== null && el[Symbol.toStringTag] === NAME;

/**
 * Create a new element
 * @param tag
 * @returns {gySVGObject}
 */
const create = (tag) => wrapper(document.createElementNS(NS, tag));

/**
 * Create, wrap or return the wrapped object
 * @param {gySVGObject|object|string} tag
 * @returns {gySVGObject|object}
 */
const createWrap = (tag) =>
  isType(tag, STRING) ?
    create(tag) :
    isType(tag, OBJECT) && tag !== null ?
      isWrapped(tag) ?
        tag :
        wrapper(tag) :
      tag;

/**
 * Return the original method name for an alias
 * @param {string} prop
 * @returns {string}
 */
const alias = (prop) => ({
  content : 'innerHTML',
  source  : 'outerHTML',
  parent  : 'parentElement',
  next    : 'nextElementSibling',
  previous: 'previousElementSibling'
})[prop] || prop;


/**
 * Convert property name to attribute with hyphens
 * @param {string} name
 * @returns {string}
 */
const toHyphen = name => name.replace(/([A-Z])/g, '-$1').toLowerCase();

/**
 * @typedef {Object} gySVGObject
 */

/**
 * GYSVGObject
 */
class GYSVGObject {

  constructor (element) {
    this._el   = element;
    this.gySVG = gySVG;
  }

  get [Symbol.toStringTag] () {
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
    let r = createWrap(tag);
    if (r) {
      this._el.appendChild(r._el);
    }
    return r;
  }

  /**
   * @param {gySVGObject|Object|string} tag
   * @returns {gySVGObject}
   */
  addBefore (tag) {
    let r = createWrap(tag);
    if (r) {
      this._el.insertBefore(r._el, this._el.firstChild || null);
    }
    return r;
  }

  /**
   * @param {string|Object} tag
   * @returns {gySVGObject}
   */
  attachTo (tag) {
    const r = isType(tag, OBJECT) ?
      (isWrapped(tag) ?
          tag._el :
          tag
      ) :
      document.querySelector(tag);
    r.appendChild(this._el);
    return this;
  }

  /**
   * gySVGObject.id()
   * @param {string} [value]
   * @returns {string|gySVGObject}
   */
  id (value) {
    if (!value) {
      return this._el.id || (this._el.id = randomId());
    }
    this._el.setAttribute('id', value);
    return this;
  }

  /**
   * gySVGObject.ref()
   * @returns {string}
   */
  ref () {
    return `#${this.id()}`;
  }

  /**
   * gySVGObject.url()
   * @returns {string}
   */
  url () {
    return `url(${this.ref()})`;
  }

  /**
   * @param {object|array<object>} keyframes
   * @param {number|object} [options]
   * @param {function|null} [startCallback]
   * @param {function|null} [endCallback]
   * @return {gySVGObject}
   * Notice: the original animateTo method is overwriting for this plugin
   */
  animateTo (keyframes, options = {duration: 200}, startCallback = null, endCallback = null) {

    /**
     * Fixed and configure default values for .animateTo() options
     * @param {object} opts
     * @returns {object}
     */
    const normalizeOptions = (opts) => {
      const normalizedConfig = isType(opts, OBJECT) ? Object.assign({}, opts) : {duration: opts};
      if (reduceMotion) {
        normalizedConfig.duration = 0;
      }
      normalizedConfig.fill = FILL;
      return normalizedConfig;
    }

    /**
     * Transform and configure default values for .animate() keyframes. Detect unsupported attributes.
     * @param {object|[{}]} originalKeyframes
     * @returns {[{}]}
     */
    const normalizeKeyframes = (originalKeyframes) => {
      originalKeyframes     = is(originalKeyframes, Array) ? originalKeyframes : [originalKeyframes];
      const computedStyle   = window.getComputedStyle(this._el);
      const normalizeFrames = [];
      const alternativeKeys = new Set();
      for (let keyframe of originalKeyframes) {
        const normalized = Object.assign({}, keyframe);
        for (let key in normalized) {
          if (!(key in computedStyle)) {
            alternativeKeys.add(key);
          } else if (key === D) {
            normalized.d = `${PATH}("${normalized.d}")`
          } else if (key === TRANSFORM) {
            normalized.transform = transform(normalized.transform)
          }
        }
        normalizeFrames.push(normalized);
      }
      addAlternatives(alternativeKeys, normalizeFrames);
      return normalizeFrames;
    }

    const alternatives    = []
    /**
     * create SMIL animate as alternative
     * @param {Set} keys
     * @param {[{}]} normalizeFrames
     */
    const addAlternatives = (keys, normalizeFrames) => {
      if (keys.size) {
        const computedFrames = new KeyframeEffect(null, normalizeFrames).getKeyframes();
        const initialTime    = this.closest(SVG).getCurrentTime() * 1000;
        for (let key of keys) {
          const altAnimate = gySVG(ANIMATE)
            .attributeName(key)
            .dur(config.duration + MS)
            .begin((0 | initialTime + (options.delay || 0)) + MS)
            .fill(FREEZE);
          if (normalizeFrames.length === 1) {
            altAnimate.to(normalizeFrames[0][key]);
          } else {
            const keyTimes = [];
            const values   = [];
            for (let n in computedFrames) {
              const frame = computedFrames[n];
              if (key in normalizeFrames[n]) {
                keyTimes.push(frame.computedOffset);
                values.push(normalizeFrames[n][key]);
              }
            }
            if (keyTimes[0] !== 0) {
              keyTimes.unshift(0);
              values.unshift(this[key]() || INHERIT);
            }
            if (keyTimes[keyTimes.length - 1] !== 1) {
              keyTimes.push(1);
              values.push(this[key]() || INHERIT);
            }
            altAnimate.keyTimes(keyTimes.join(';')).values(values.join(';'));
          }
          alternatives.push(altAnimate);
          altAnimate.attachTo(this)
        }
      }
    };

    /**
     * Normalize a transform property
     * @param {object|string} property
     * @returns {string|*}
     */
    const transform = (property) => {
      if (isType(property, STRING)) {
        property = JSON.parse('{' +
                              property
                                .replace(/\s*\(\s*/g, ':[')
                                .replace(/\s*\)\s*/g, '],')
                                .split(/\s*,\s*|\s.*/).join(',')
                                .replace(/(\w+):/g, '"$1":')
                                .replace(/,$/, '')
                              + '}');
      }
      let result = EMPTY_STRING;
      for (let key in property) {
        if (key === ROTATE) {
          const values = transformValue(property[key]);
          if (values.length > 1) {
            result += `${TRANSLATE}(${values[1]}${PX},${values[2]}${PX}) `
          }
          result += `${key}(${values[0]}${transformUnit(key)}) `
          if (values.length > 1) {
            result += `${TRANSLATE}(-${values[1]}${PX},-${values[2]}${PX}) `
          }
        } else {
          result += `${key}(${transformValue(property[key]).map(v => v + transformUnit(key)).join(COMA)}) `
        }
      }
      return result;
    }

    /**
     * Create a normalized transform value array
     * @param {*} value
     * @returns {[]}
     */
    const transformValue = (value) => (is(value, Array) ? value : String(value).split(/\s+|,/));

    /**
     * Return the transform value
     * @param {string} type
     * @returns {string}
     */
    const transformUnit = (type) => DEG_TYPES.includes(type) ? DEG : type === TRANSLATE ? PX : EMPTY_STRING;

    /**
     * Convert to valida attribute value
     * @param {string|*} value
     * @returns {string|*}
     */
    const value2attribute = (value) =>
      typeof value === 'string' ?
        value.replace(/(deg)|(px)/g, EMPTY_STRING).trim() :
        value

    /**
     * Transform d CSS property to valid d attribute format
     * @param {string} d
     * @returns {string}
     */
    const d2attribute = (d) => d
      .replace(/(path\s*\(\s*["'])|(["']\s*\)\s*$)/g, EMPTY_STRING)
      .trim()
      .replace(/([a-zA-Z])\s*/g, '$1')
      .replace(/\s+/g, COMA);

    // Main code
    const config    = normalizeOptions(options);
    const frames    = normalizeKeyframes(keyframes);
    const animation = this._el.animate(frames, config);

    animation.ready.then(() => isType(startCallback, FUNCTION) && startCallback.call(this, animation));

    animation.finished.then(() => {
      const lastAttributes = frames[frames.length - 1];
      for (let attr in lastAttributes) {
        const attrKey = toHyphen(attr);
        if (/^text-/.test(attrKey)) {
          this._el.style[attr] = lastAttributes[attr];
        } else if (attr !== OFFSET && attr in lastAttributes) {
          this._el.setAttribute(
            attrKey,
            attrKey === 'd' ?
              d2attribute(lastAttributes[attr]) :
              value2attribute(lastAttributes[attr]));
        }
      }
      alternatives.forEach(altAnimate => {
        altAnimate[FINISHED](true);
        const animates = this._el.querySelectorAll(ANIMATE);
        const finished = this._el.querySelectorAll(`${ANIMATE}[${FINISHED}]`);
        if (animates.length === finished.length) {
          animates.forEach(a => a.remove())
        }
      });
      isType(endCallback, FUNCTION) && endCallback.call(this, animation);
    });

    return this;
  }
}

/**
 *
 * @param element
 * @returns {gySVGObject}
 */
const wrapper = (element) => {
  if (!isType(element, OBJECT) || element === null) {
    return null;
  }
  if (cache.has(element)) {
    return cache.get(element);
  }
  const proxy = new Proxy(
    new GYSVGObject(element),
    // Handler
    {
      get (wrapped, prop) {
        // Symbol return
        if (directAccess(prop)) {
          return wrapped[prop];
        }
        // Return the wrapper method
        if (!isType(wrapped[prop], UNDEFINED)) {
          return (...args) =>
            pluginCallback(proxy, prop, args) ||
            wrapped[prop].call(proxy, ...args);
        }
        // Special case <path d=""></path>
        if (prop === D && element.tagName.toLowerCase() === PATH) {
          let content  = EMPTY_STRING;
          const dProxy = new Proxy(
            (arg) =>
              pluginCallback(proxy, prop, [arg]) ||
              arg ? element.setAttribute(D, arg) || proxy : element.getAttribute(D),
            {
              get (_target, command) {
                return (...args) => {
                  content += pluginCallbackPathD(proxy, command, args) || `${command}${args.join(COMA)}`;
                  element.setAttribute(prop, content);
                  return dProxy;
                };
              }
            }
          );
          return dProxy;
        }
        prop = alias(prop);
        // Return the element method
        if (isType(element[prop], FUNCTION)) {
          return (...args) => {
            const result =
                    pluginCallback(proxy, prop, args) ||
                    element[prop].call(element, ...args);
            return (
              result === undefined ?
                proxy :
                adaptedResult(result)
            );
          };
        }
        // Return the wrapped method
        return methodWrapper(element, prop, proxy);
      }
    }
  );
  cache.set(element, proxy);
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
  const propNormalized = prop.replace(/_/g, '-');
  const f              = (...args) => {
    const r = pluginCallback(parentWrapper, parentProp ? `${parentProp}.${prop}` : prop, args);
    if (r !== undefined) {
      return r;
    }
    // Get value
    if (args.length === 0) {
      const result = element.hasAttribute && element.hasAttribute(propNormalized) ?
        element.getAttribute(propNormalized) :
        element[propNormalized];
      return adaptedResult(result);
    }
    // Set value as property
    const value = args[0];
    if (is(element, CSSStyleDeclaration)) {
      element[propNormalized] = value;
      return parentWrapper;
    }
    if (propNormalized in element && !readonlyProp.has(propNormalized)) {
      if (element[propNormalized] === value) {
        return parentWrapper;
      }
      const previousValue = element[propNormalized];
      try {
        element[propNormalized] = value;
      } catch (err) {
        readonlyProp.add(propNormalized);
      }
      if (
        (isType(element[propNormalized], OBJECT) && element[propNormalized] === value) ||
        element[propNormalized] !== previousValue
      ) {
        return parentWrapper;
      }
      readonlyProp.add(propNormalized);
    }
    // Set value as attribute
    if (value !== 0 && !value) {
      element.removeAttribute(propNormalized);
    } else {
      element.setAttribute(propNormalized, isType(value, BOOLEAN) ? '' : String(args));
    }
    return parentWrapper;
  };
  return new Proxy(
    f,
    {
      get (_target, prop2) {
        const result = element[propNormalized][prop2];
        return (
          isType(result, FUNCTION) ?
            (...args) => {
              const r =
                      pluginCallback(parentWrapper, `${prop}.${prop2}`, args) ||
                      result.call(element[propNormalized], ...args);
              return r === undefined ? parentWrapper : r;
            } :
            methodWrapper(element[propNormalized], prop2, parentWrapper, propNormalized)
        );
      },
      set (_target, prop2, value2) {
        element[propNormalized][prop2] = value2;
        return true;
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
    is(result, HTMLCollection) || is(result, NodeList) ?
      [...result].map(x => wrapper(x)) :
      is(result, SVGElement) ?
        wrapper(result) :
        isType(result, STRING) ?
          result === '' || Number.isNaN(Number(result)) ?
            result :
            Number(result) :
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
    return wrapped._call(wrapped, prop, args);
  }
};

/**
 * pluginCallbackPathD
 * @param {Object} wrapped
 * @param {string} prop
 * @param {Array} args
 */
const pluginCallbackPathD = (wrapped, prop, args) => {
  if (wrapped._d) {
    return wrapped._d(wrapped, prop, args);
  }
};

/**
 * @typedef {function} gySVG
 */

/**
 * gySVG
 * @param {Object|gySVGObject|string} [el]
 * @returns {gySVGObject|Object|null}
 * @constructor
 */
export function gySVG (el) {
  pluginCallback(gySVG, EMPTY_STRING, [el]);
  return createWrap(isType(el, UNDEFINED) ? SVG : el);
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
 * @return {gySVG}
 */
gySVG.extend = (plugin) => {
  plugin(gySVG, GYSVGObject);
  return gySVG;
}


