// 37) animateTo() transform rotate as string

export const description = `
move the rectangle with transform rotate as string
`;

export function script () {
  const div    = document.querySelector('#show');
  const run    = document.querySelector('#run');
  const code   = document.querySelector('#result');
  const svg    = gySVG().viewBox(0, 0, 100, 100).width(100).height(100);
  const rect = svg.add('rect').x(40).y(40).width(20).height(20).fill('black');
  svg.attachTo(div);
  code.innerHTML = div.outerHTML.replace(/</g, '&lt;');
  run.addEventListener('click', () => {
    rect.animateTo(
      rect.transform() !== 'translate(50,50) rotate(315) translate(-50,-50)' ?
        [{transform: 'rotate(0, 50, 50)'}, {transform: 'rotate(315, 50, 50)'}] :
        [{transform: 'rotate(315, 50, 50)'}, {transform: 'rotate(0, 50, 50)'}] ,
      1000,
      () => code.innerHTML = 'moving...',
      () => code.innerHTML = div.outerHTML.replace(/</g, '&lt;')
    );
  });
}

export default `<div id="show"></div>
<button id="run">move</button>
<code id="result"></code>`;
