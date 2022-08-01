// 19) querySelector() with wrong selector

export const description = `
querySelector() return a undefined element with a wrong selector
`;

export function script () {
  const div  = document.querySelector('#show');
  const code = document.querySelector('#result');
  const svg  = gySVG().viewBox(0, 0, 100, 100).width(100).height(100)
  svg.add('circle').id('test').cx(50).cy(50).r(40);
  svg.attachTo(div);
  const circle = svg.querySelector('#wrong-selector');
  code.innerHTML = typeof circle === 'undefined' ? 'found' : 'not found';
}

export default `<div id="show"></div>
<code id="result"></code>`;
