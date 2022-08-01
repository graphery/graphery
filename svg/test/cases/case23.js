// 23) remove an SVG child

export const description = `
remove() delete a child from the SVG
`;

export function script () {
  const div    = document.querySelector('#show');
  const run    = document.querySelector('#run');
  const code   = document.querySelector('#result');
  const svg    = gySVG().viewBox(0, 0, 100, 100).width(100).height(100);
  const circle = svg.add('circle').cx(50).cy(50).r(40);
  svg.attachTo(div);
  code.innerHTML = div.outerHTML.replace(/</g, '&lt;');
  run.addEventListener('click', () => {
    circle.remove();
    code.innerHTML = div.outerHTML.replace(/</g, '&lt;');
  });
}

export default `<div id="show"></div>
<button id="run">remove</button>
<p><code id="result"></code></p>`;
