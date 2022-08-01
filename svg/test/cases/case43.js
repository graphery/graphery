// 43) ref

export const description = `
to use "use" element for clone an element
`;

export function script () {
  const div   = document.querySelector('#show');
  const code  = document.querySelector('#result');
  const svg   = gySVG().viewBox(0, 0, 100, 100).width(100).height(100)
  const circle = svg.add('circle').cx (60).cy (60).r (30).stroke('red').stroke_width(5);
  svg.add('use').href(circle.ref()).x(-20).y(-20).fill('blue');
  svg.attachTo(div);
  code.innerHTML = div.outerHTML.replace(/</g, '&lt;');
}

export default `<div id="show"></div>
<code id="result"></code>`;
