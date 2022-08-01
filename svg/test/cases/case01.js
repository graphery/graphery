// 1) Create a SVG

export const description = `
create a very simple SVG element
`;

export function script () {
  const div  = document.querySelector('#show');
  const code = document.querySelector('#result');
  const svg  = gySVG().viewBox('0 0 100 100').width(100).height(100)
  svg.add('line').x1(10).y1(10).x2(90).y2(90).stroke('black').stroke_width(10);
  svg.add('line').x1(10).y1(90).x2(90).y2(10).stroke('black').stroke_width(10);
  svg.attachTo(div);
  code.innerHTML = div.outerHTML.replace(/</g, "&lt;");
}

export default `<div id="show"></div>
<code id="result"></code>`;
