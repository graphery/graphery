// 30) get and set d attribute of path

export const description = `
get and set d attribute from path element
`;

export function script () {
  const div  = document.querySelector('#show');
  const code = document.querySelector('#result');
  const svg  = gySVG().viewBox(0, 0, 100, 100).width(100).height(100);
  const path = svg.add('path');
  path.d
      .M(10, 30)
      .A(20, 20, 0, 0, 1, 50, 30)
      .A(20, 20, 0, 0, 1, 90, 30)
      .Q(90, 60, 50, 90)
      .Q(10, 60, 10, 30)
      .Z();
  code.innerHTML = `path.d = ${path.d()}`;
  svg.attachTo(div);
}

export default `<div id="show"></div>
<code id="result"></code>`;
