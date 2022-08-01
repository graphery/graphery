// 47) clipPath and url()

export const description = `
define a rectangle with a clipPath circle
`;

export function script () {
  const div    = document.querySelector('#show');
  const code   = document.querySelector('#result');
  const svg    = gySVG().viewBox(0, 0, 100, 100).width(100).height(100);
  const clipPath = svg.add('clipPath').id('myClip').clipPathUnits('objectBoundingBox');
  clipPath.add('circle').cx(0.5).cy(1).r(0.5)
  svg.add('rect').x(10).y(10).width(80).height(80)
     .clip_path(clipPath.url());
  svg.attachTo(div);
  code.innerHTML = div.outerHTML.replace(/</g, '&lt;');
}

export default `<div id="show"></div>
<code id="result"></code>`;
