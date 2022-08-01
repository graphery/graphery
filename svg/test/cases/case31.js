// 31) get and set content()

export const description = `
get and set text content
`;

export function script () {
  const div   = document.querySelector('#show');
  const input = document.querySelector('#input');
  const code  = document.querySelector('#result');
  const svg   = gySVG().viewBox(0, 0, 100, 100).width(100).height(100);
  const text  = svg.add('text').x(0).y(50);
  svg.attachTo(div);
  code.innerHTML = `SVG Text = ${text.content()}`;
  input.addEventListener('input', () => {
    text.content(input.value);
    code.innerHTML = `SVG Text = ${text.content()}`;
  });
}

export default `<div id="show"></div>
<input type="text" id="input">
<code id="result"></code>`;
