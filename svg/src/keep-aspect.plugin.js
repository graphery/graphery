import installResizeObserver from './resize-observer.plugin.js';

export default function install (gySVG, gySVGObject) {
  
  // Install dependencies
  installResizeObserver(gySVG, gySVGObject);
  
  // Update gySVGObject
  Object.assign (
    gySVGObject.prototype, {
      /**
       * keepAspect
       * @returns {gySVGObject}
       */
      keepAspect () {
        const svg = this.closest ('svg');
        switch (this.el.tagName.toLowerCase ()) {
          case 'text':
            keepTextAspect (svg, this);
            break;
          case 'line':
            keepLineAspect (svg, this);
            break;
          default:
            keepStrokeAspect(svg, this);
        }
        return this;
      }
    });
}

/**
 *
 * @param {gySVGObject} svg
 * @param {gySVGObject} shape
 */
function keepStrokeAspect(svg, shape) {
  let originalCTM      = svg.getScreenCTM () || {a: 1, d: 1};
  const _keepStrokeWidth = shape.stroke_width ();
  svg.resizeObserver ((svg2, currentCTM) => {
    const proportion =  Math.max(currentCTM.a / originalCTM.a, currentCTM.d / originalCTM.d);
    shape.stroke_width (_keepStrokeWidth / proportion);
  });
}

// export function keepStrokeWidth (svg, el) {
//   const originalCTM = svg.getScreenCTM ();
//   const dimension   = originalCTM.a > originalCTM.d ? 'a' : 'd';
//   el.el._keepWidth  = (el.stroke_width () || parseFloat (getComputedStyle (el.el).strokeWidth)) * Math.max (
//     originalCTM.a,
//     originalCTM.d
//   );
//   svg.resizeObserver ((svg, currentCTM) => {
//     el.stroke_width (el.el._keepWidth / currentCTM[ dimension ]);
//     // console.log(el.stroke_width())
//   });
// }


/**
 *
 * @param {gySVGObject} svg
 * @param {gySVGObject} text
 */
function keepTextAspect (svg, text) {
  const originalCTM = svg.getScreenCTM () || {a: 1, d: 1};
  text.el._keepX    = text.x ();
  text.el._keepY    = text.y ();
  svg.resizeObserver ((svg2, currentCTM) => {
    text.transform (`scale( ${ originalCTM.a / currentCTM.a }, ${ originalCTM.d / currentCTM.d })`);
    text.x (text.el._keepX / (originalCTM.a / currentCTM.a));
    text.y (text.el._keepY / (originalCTM.d / currentCTM.d));
  });
}

/**
 *
 * @param {gySVGObject} svg
 * @param {gySVGObject} line
 */
function keepLineAspect (svg, line) {
  const originalCTM = svg.getScreenCTM () || {a: 1, d: 1};
  line.el._keepX1   = line.x1 ();
  line.el._keepX2   = line.x2 ();
  line.el._keepY1   = line.y1 ();
  line.el._keepY2   = line.y2 ();
  svg.resizeObserver ((svg2, currentCTM) => {
    line.transform (`scale( ${ originalCTM.a / currentCTM.a }, ${ originalCTM.d / currentCTM.d })`);
    line.x1 (line.el._keepX1 / (originalCTM.a / currentCTM.a));
    line.x2 (line.el._keepX2 / (originalCTM.a / currentCTM.a));
    line.y1 (line.el._keepY1 / (originalCTM.d / currentCTM.d));
    line.y2 (line.el._keepY2 / (originalCTM.d / currentCTM.d));
  });
}


// /**
//  *
//  * @param {gySVGObject} svg
//  * @param {gySVGObject} circle
//  */
// function keepCircleAspect (svg, circle) {
//   const originalCTM = svg.getScreenCTM ();
//   circle.el._keepCX = circle.cx ();
//   circle.el._keepCY = circle.cy ();
//   circle.el._keepR  = circle.r ();
//   svg.resizeObserver ((svg2, currentCTM) => {
//     circle.transform (`scale( ${ originalCTM.a / currentCTM.a }, ${ originalCTM.d / currentCTM.d })`);
//     circle.cx (circle.el._keepCX / (originalCTM.a / currentCTM.a));
//     circle.cy (circle.el._keepCY / (originalCTM.d / currentCTM.d));
//     circle.r (circle.el._keepR / Math.max (
//       originalCTM.a / currentCTM.a,
//       originalCTM.d / currentCTM.d
//     ));
//   });
// }

// /**
//  *
//  * @param {gySVGObject} svg
//  * @param {gySVGObject} rect
//  */
// function keepRectAspect (svg, rect) {
//   const originalCTM       = svg.getScreenCTM ();
//   rect.el._keepX          = rect.x ();
//   rect.el._keepY          = rect.y ();
//   rect.el._keepWidth      = rect.width ();
//   rect.el._keepHeight     = rect.height ();
//   rect.el._keepProportion = rect.el._keepWidth / rect.el._keepHeight;
//   svg.resizeObserver ((svg2, currentCTM) => {
//     rect.transform (`scale( ${ originalCTM.a / currentCTM.a }, ${ originalCTM.d / currentCTM.d })`);
//     rect.x (rect.el._keepX / (originalCTM.a / currentCTM.a));
//     rect.y (rect.el._keepY / (originalCTM.d / currentCTM.d));
//     const width  = (rect.el._keepWidth / (originalCTM.a / currentCTM.a));
//     const height = (rect.el._keepHeight / (originalCTM.d / currentCTM.d));
//     if (rect.el._keepProportion >= width / height) {
//       rect.width (width);
//       rect.height (width / rect.el._keepProportion);
//     } else {
//       rect.width (height * rect.el._keepProportion);
//       rect.height (height);
//     }
//   });
// }

// /**
//  *
//  * @param {gySVGObject} svg
//  * @param {gySVGObject} ellipse
//  */
// function keepEllipseAspect (svg, ellipse) {
//   const originalCTM          = svg.getScreenCTM ();
//   ellipse.el._keepCX         = ellipse.cx ();
//   ellipse.el._keepCY         = ellipse.cy ();
//   ellipse.el._keepRX         = ellipse.rx ();
//   ellipse.el._keepRY         = ellipse.ry ();
//   ellipse.el._keepProportion = ellipse.el._keepRX / ellipse.el._keepRY;
//   svg.resizeObserver ((svg2, currentCTM) => {
//     ellipse.transform (`scale( ${ originalCTM.a / currentCTM.a }, ${ originalCTM.d / currentCTM.d })`);
//     ellipse.cx (ellipse.el._keepCX / (originalCTM.a / currentCTM.a));
//     ellipse.cy (ellipse.el._keepCY / (originalCTM.d / currentCTM.d));
//     const rx = (ellipse.el._keepRX / (originalCTM.a / currentCTM.a));
//     const ry = (ellipse.el._keepRY / (originalCTM.d / currentCTM.d));
//     if (ellipse.el._keepProportion >= rx / ry) {
//       ellipse.rx (rx);
//       ellipse.ry (rx / ellipse.el._keepProportion);
//     } else {
//       ellipse.rx (ry * ellipse.el._keepProportion);
//       ellipse.ry (ry);
//     }
//   });
// }
