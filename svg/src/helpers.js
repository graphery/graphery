/**
 * Convert an angle from degrees to radians
 * @param {number} degrees
 * @returns {number}
 */
export function degrees2radians (degrees) {
  return ((degrees - 90) * Math.PI) / 180.0;
}

/**
 * Return an x, y coordinates from an angular reference
 * @param {number} centerX
 * @param {number} centerY
 * @param {number} radius
 * @param {number} angleDegrees
 * @returns {{x : *, y : *}}
 */
export function polarToCartesian (centerX, centerY, radius, angleDegrees) {
  const angleRadians = degrees2radians (angleDegrees);
  return {
    x : centerX + radius * Math.cos (angleRadians),
    y : centerY + radius * Math.sin (angleRadians)
  };
}

/**
 * Create an arc path
 * @param {number} x
 * @param {number} y
 * @param {number} radius
 * @param {number} startAngle
 * @param {number} endAngle
 * @return {string}
 */
export function createArc (x, y, radius, startAngle, endAngle) {
  const start        = polarToCartesian (x, y, radius, endAngle);
  const end          = polarToCartesian (x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return `M${ start.x },${ start.y }A${ radius },${ radius },0,${ largeArcFlag },0,${ end.x },${ end.y }`;
}
