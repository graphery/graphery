// 17) querySelector()

export const description = `
querySelector() return a wrapped element
`;

export function script () {
  const div  = document.querySelector('#show');
  const code = document.querySelector('#result');
  const svg  = gySVG().viewBox(0, 0, 100, 100).width(100).height(100)
  svg.add('circle').id('test');
  svg.querySelector('#test').cx(50).cy(50).r(40);
  svg.attachTo(div);
  code.innerHTML = div.outerHTML.replace(/</g, '&lt;');
}

export default `<div id="show"></div>
<code id="result"></code>`;
