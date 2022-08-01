// 28) get and set attribute with dashes

export const description = `
get and set fill-opacity attribute
`;

export function script () {
  const div    = document.querySelector('#show');
  const input  = document.querySelector('#input');
  const code   = document.querySelector('#result');
  const svg    = gySVG().viewBox(0, 0, 100, 100).width(100).height(100);
  const circle = svg.add('circle').cx(50).cy(50).r(40);
  svg.attachTo(div);
  code.innerHTML = `circle fill-opacity = ${circle.fill_opacity()}`;
  input.addEventListener('input', () => {
    circle.fill_opacity(input.value);
    code.innerHTML = `circle fill-opacity = ${circle.fill_opacity()}`;
  });
}

export default `<div id="show"></div>
<input type="number" value="1" min="0" max="1" step="0.05" id="input">
<code id="result"></code>`;
