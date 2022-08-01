// guide-readme-01 - vanilla javascript

export function script () {
  const div = document.querySelector('#show');
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '100px');
  svg.setAttribute('height', '100px');
  div.appendChild(svg);
  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('x', '10');
  rect.setAttribute('y', '10');
  rect.setAttribute('width', '90');
  rect.setAttribute('height', '90');
  rect.setAttribute('fill', '#F06');
  svg.appendChild(rect);
}

export default `<div id="show"></div>`;