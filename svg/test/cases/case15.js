// 15) create a circle and add

export const description = `
create a circle and add into the SVG element
`;

export function script () {
  const div    = document.querySelector('#show');
  const code   = document.querySelector('#result');
  const svg    = gySVG().viewBox(0, 0, 100, 100).width(100).height(100)
  const circle = gySVG('circle').cx(50).cy(50).r(40);
  svg.add(circle);
  svg.attachTo(div);
  code.innerHTML = div.outerHTML.replace(/</g, '&lt;');
}

export default `<div id="show"></div>
<code id="result"></code>`;
