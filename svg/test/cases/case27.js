// 27) set attribute value

export const description = `
set the circle radius attribute
`;

export function script () {
  const div    = document.querySelector('#show');
  const input = document.querySelector('#input');
  const code   = document.querySelector('#result');
  const svg    = gySVG().viewBox(0, 0, 100, 100).width(100).height(100);
  const circle = svg.add('circle').cx(50).cy(50).r(40);
  svg.attachTo(div);
  code.innerHTML = `circle radius = ${circle.r()}`;
  input.addEventListener('input', () => {
    if (input.value) {
      circle.r(input.value);
      code.innerHTML = `circle radius = ${circle.r()}`;
    }
  });
}

export default `<div id="show"></div>
<input type="number" value="40" id="input">
<code id="result"></code>`;
