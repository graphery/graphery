// 16) create a native circle and add

export const description = `
create a native circle and add into the SVG element
`;

export function script () {
  const div    = document.querySelector('#show');
  const code   = document.querySelector('#result');
  const svg    = gySVG().viewBox(0, 0, 100, 100).width(100).height(100)
  const circle = document.createElementNS ('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', '50');
  circle.setAttribute('cy', '50');
  circle.setAttribute('r', '40');
  svg.add(circle);
  svg.attachTo(div);
  code.innerHTML = div.outerHTML.replace(/</g, '&lt;');
}

export default `<div id="show"></div>
<code id="result"></code>`;
