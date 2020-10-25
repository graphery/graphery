/**
 * This callback is displayed as part of the Requester class.
 * @callback resizeObserver~callback
 * @param {SVGElement|gySVGObject} svg
 * @param {SVGMatrix} currentMatrix
 * @param {SVGMatrix} prevMatrix
 */

const resizeObserverCache = new WeakMap ();

/**
 * keepAspect
 * @usage gySVG.extension( keepAspect )
 * @type {{keepAspect() : gySVGObject}}
 */
export default function install (gySVG, gySVGObject) {
  // Update gySVGObject
  Object.assign (
    gySVGObject.prototype, {
      resizeObserver (callback) {
        const self = this;
        const svg  = this.el.tagName.toLowerCase () === 'svg' ? this.el : this.parent ('svg').el;
        if (resizeObserverCache.has (svg)) {
          return resizeObserverCache.get (svg).push (callback);
        }
        resizeObserverCache.set (svg, [callback]);
        let prevMatrix = {};
        const check    = () => {
          const currentMatrix = svg.getScreenCTM ();
          if (
            currentMatrix.a !== prevMatrix.a ||
            currentMatrix.b !== prevMatrix.b ||
            currentMatrix.c !== prevMatrix.c ||
            currentMatrix.d !== prevMatrix.d ||
            currentMatrix.e !== prevMatrix.e ||
            currentMatrix.f !== prevMatrix.f
          ) {
            const callbacks = resizeObserverCache.get (svg);
            for (let cb of callbacks) {
              cb (self, currentMatrix, prevMatrix);
            }
            prevMatrix = currentMatrix;
          }
          window.requestAnimationFrame (check);
        };
        check ();
        return self;
      }
    });
}
