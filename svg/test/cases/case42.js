// 42) addBefore

export const description = `
add a circle before than other element
`;

export function script () {
  const div   = document.querySelector('#show');
  const code  = document.querySelector('#result');
  const svg   = gySVG().viewBox(0, 0, 100, 100).width(100).height(100)
  svg.add('circle').cx (60).cy (60).r (30).fill('red');
  svg.addBefore('circle').cx (30).cy (30).r (30).fill('blue');
  svg.attachTo(div);
  code.innerHTML = div.outerHTML.replace(/</g, '&lt;');
}

export default `<div id="show"></div>
<code id="result"></code>`;
