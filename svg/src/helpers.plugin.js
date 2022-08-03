/**
 * Convert an angle from degrees to radians
 * @param {number} degrees
 * @returns {number}
 */
function degrees2radians (degrees) {
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
function polar2cartesian (centerX, centerY, radius, angleDegrees) {
  const angleRadians = degrees2radians(angleDegrees);
  return {
    x: centerX + radius * Math.cos(angleRadians),
    y: centerY + radius * Math.sin(angleRadians)
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
function arc (x, y, radius, startAngle, endAngle) {
  const start        = polar2cartesian(x, y, radius, endAngle);
  const end          = polar2cartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return `M${start.x},${start.y}A${radius},${radius},0,${largeArcFlag},0,${end.x},${end.y}`;
}

/**
 * Create an arched bar shape with a path
 * @param {number} x
 * @param {number} y
 * @param {number} radius
 * @param {number} width
 * @param {number} startAngle
 * @param {number} endAngle
 * @returns {string}
 */
function barArc (x, y, radius, width, startAngle, endAngle) {
  const externalStart = polar2cartesian(x, y, radius, endAngle);
  const externalEnd   = polar2cartesian(x, y, radius, startAngle);
  const internalStart = polar2cartesian(x, y, radius - width, startAngle);
  const internalEnd   = polar2cartesian(x, y, radius - width, endAngle);
  const flag  = endAngle - startAngle <= 180 ? '0' : '1';
  return `M${externalStart.x},${externalStart.y}` +
         `A${radius},${radius},0,${flag},0,${externalEnd.x},${externalEnd.y}` +
         `L${internalStart.x},${internalStart.y}` +
         `A${radius - width},${radius - width},0,${flag},1,${internalEnd.x},${internalEnd.y}` +
         `Z`;
}

const shapes = {
  arc,
  barArc
};

export default function helpersPlugin (gySVG, gySVGObj) {
  Object.assign(gySVG, {
    polar2cartesian,
    degrees2radians
  });
  const prevCall = gySVGObj.prototype._d;
  Object.assign(gySVGObj.prototype, {
    _d (wrapped, prop, args) {
      return shapes[prop] ? shapes[prop](...args) : prevCall && prevCall(wrapped, prop, args);
    }
  });
}