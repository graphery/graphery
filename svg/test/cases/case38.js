// 38) animateTo() with path

export const description = `
morphing a path shape
`;

export function script () {
  const d1 = 'M100,100L400,400M100,400L400,100';
  const d2 = 'M150,300L225,400M225,400L400,100';
  const div  = document.querySelector('#show');
  const code = document.querySelector('#result');
  const svg  = gySVG().viewBox(0, 0, 500, 500).width(100).height(100)
  const path = svg.add('path').stroke('black').stroke_width(10).d(d1)
  svg.attachTo(div);
  code.innerHTML = div.outerHTML.replace(/</g, '&lt;');
  run.addEventListener('click', () => {
    path.animateTo(
      path.d() === d1 ? {d: d2} : {d: d1},
      1000,
      () => code.innerHTML = 'moving...',
      () => code.innerHTML = div.outerHTML.replace(/</g, '&lt;')
    );
  });
}

export default `<div id="show"></div>
<button id="run">move</button>
<code id="result"></code>`;
