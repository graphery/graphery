/**
 * This callback is displayed as part of the Requester class.
 * @callback cssObserver~callback
 * @param {SVGElement|gySVGObject} svg
 * @param {object} styleValues
 */

/**
 * styleObserver
 * @usage gySVG.extension( styleObserver )
 * @type {{styleObserver() : gySVGObject}}
 */
export default function styleObserverPlugin (gySVG, gySVGObject) {
  // Update gySVGObject
  Object.assign (
    gySVGObject.prototype, {
      styleObserver (properties, callback) {
        const self = this;
        const svg  = this.el.tagName.toLowerCase () === 'svg' ? this.el : this.closest ('svg').el;
        cssObserve(svg, properties, callback);
        return self;
      }
    });
}

/**
 * Observe CSS changes
 */
const TIMEOUT     = 100;
let requestId     = 0;
let lastExecution = 0;
let elements      = new Map ();
let run           = false;

/**
 * Observe CSS changes
 * @param {Object}               element    - HTMLELement to observe
 * @param {string|Array<string>} properties - List of CSS property to observe
 * @param {Function}             callback   - function called when the CSS is changed
 */
function cssObserve (element, properties, callback) {
  if (typeof properties === 'string') {
    properties = [properties];
  }
  let observer;
  if (!elements.has (element)) {
    observer = {computedStyles : getComputedStyle (element), styles : {}, keys : []};
    elements.set (element, observer);
  } else {
    observer = elements.get (element);
  }
  for (let property of properties) {
    if (!observer.styles[ property ]) {
      observer.styles[ property ] = {lastValue : observer.computedStyles[ property ], callbacks : new Set ()};
      observer.keys.push (property);
    }
    observer.styles[ property ].callbacks.add (callback);
  }
  observe ();
}

/**
 * function for observe CSS with requestAnimationFrame
 * @param {number} [timestamp]
 */
function observe (timestamp) {
  if (!run || (timestamp - lastExecution < TIMEOUT)) {
    run       = true;
    requestId = window.requestAnimationFrame (observe);
    return;
  }
  if (!timestamp) {
    return;
  }
  lastExecution = timestamp;
  let callbacks = null;
  for (let [element, observer] of elements.entries ()) {
    for (let styleName of observer.keys) {
      const currentStyle = observer.computedStyles.getPropertyValue (styleName);
      const lastStyle    = observer.styles[ styleName ].lastValue;
      if (currentStyle !== lastStyle) {
        if (!callbacks) {
          callbacks = new Map ();
        }
        for (let callback of observer.styles[ styleName ].callbacks) {
          if (callbacks.has (callback)) {
            callbacks.get (callback)[ styleName ] = {
              current : currentStyle,
              last    : lastStyle
            };
          } else {
            callbacks.set (callback, {
              [ styleName ] : {
                current : currentStyle,
                last    : lastStyle
              }
            });
          }
        }
        observer.styles[ styleName ].lastValue = currentStyle;
      }
    }
    if (callbacks) {
      for (let [callback, values] of callbacks.entries ()) {
        callback.call (element, values);
      }
      callbacks = null;
    }
  }
  requestId = window.requestAnimationFrame (observe);
}
