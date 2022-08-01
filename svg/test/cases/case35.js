// 35) animateTo() transform

export const description = `
move the rectangle with transform translate
`;

export function script () {
  const div    = document.querySelector('#show');
  const run    = document.querySelector('#run');
  const code   = document.querySelector('#result');
  const svg    = gySVG().viewBox(0, 0, 100, 100).width(100).height(100);
  const rect = svg.add('rect').x(0).y(0).width(20).height(20).fill('black');
  svg.attachTo(div);
  code.innerHTML = div.outerHTML.replace(/</g, '&lt;');
  run.addEventListener('click', () => {
    rect.animateTo(
      rect.transform() !== 'translate(80,80)' ? {transform: {translate: [80, 80]}} : {transform: 'translate(0, 0)'} ,
      1000,
      () => code.innerHTML = 'moving...',
      () => code.innerHTML = div.outerHTML.replace(/</g, '&lt;')
    );
  });
}

export default `<div id="show"></div>
<button id="run">move</button>
<code id="result"></code>`;
