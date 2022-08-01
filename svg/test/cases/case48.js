// 48) call to gySVG() with null

export const description = `
special case when call to gySVG with null
`;

export function script () {
  const r          = gySVG(null);
  const result     = document.querySelector('#result');
  result.innerHTML = `gySVG(null) = ${r}`;
}

export default `<code id="result"></code>`;
