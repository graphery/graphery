// 51) delete an attribute

export const description = `
delete an attribute
`;

export function script () {
  const div  = document.querySelector('#show');
  const code = document.querySelector('#result');
  const svg  = gySVG('svg').viewBox(0, 0, 100, 100).width(100).height(100);
  const line = svg.add('line').x1(10).y1(50).x2(90).y2(50).stroke('black').stroke_width(10);
  line.stroke_width(false);
  svg.attachTo(div);
  code.innerHTML = div.outerHTML.replace(/</g, "&lt;");
}

export default `<div id="show"></div>
<code id="result"></code>`;