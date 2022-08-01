// 29) get and set style property values

export const description = `
get and set style opacity value
`;

export function script () {
  const div          = document.querySelector('#show');
  const styleOpacity = document.querySelector('#styleOpacity');
  const code         = document.querySelector('#result');
  const svg          = gySVG().viewBox(0, 0, 100, 100).width(100).height(100);
  const circle       = svg.add('circle').cx(50).cy(50).r(40);
  svg.attachTo(div);
  code.innerHTML = `circle style.opacity = ${circle.style.opacity()}`;
  styleOpacity.addEventListener('input', () => {
    circle.style.opacity(styleOpacity.value);
    code.innerHTML = `circle style.opacity = ${circle.style.opacity()}`;
  });
}

export default `<div id="show"></div>
<input type="number" value="1" min="0" max="1" step="0.05" id="styleOpacity">
<code id="result"></code>`;
