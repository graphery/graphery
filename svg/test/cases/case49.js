// 49) call to add() with null

export const description = `
special case when call to gySVG with null
`;

export function script () {
  const r          = gySVG().add(null);
  const result     = document.querySelector('#result');
  result.innerHTML = `gySVG().add(null) = ${r}`;
}

export default `<code id="result"></code>`;
