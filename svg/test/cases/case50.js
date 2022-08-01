// 50) set and get a custom Symbol

export const description = `
add and check a custom Symbol property into a gySVGObject
`;

export function script () {
  const symbol     = Symbol();
  const svg        = gySVG();
  svg[symbol]      = 'checked';
  const result     = document.querySelector('#result');
  result.innerHTML = `svg[symbol] = ${svg[symbol]}`;
}

export default `<code id="result"></code>`;
