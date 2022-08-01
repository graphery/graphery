// 46) add a plugin with a static method

export const description = `
define a static method by plugin extension
`;

export function script () {
  const div    = document.querySelector('#show');
  const code   = document.querySelector('#result');
  const svg    = gySVG().viewBox(0, 0, 100, 100).width(100).height(100);
  const circle = svg.add('circle').cx(50).cy(50).r(40);
  svg.attachTo(div);
  gySVG.extend((gySVG, gySVGObject) => {
    Object.assign(
      gySVG,
      {
        test (element) {
          return gySVG.isWrapped(element) ? 'is a Graphery Object' : 'is not a Graphery object'
        }
      }
    );
  });
  code.innerHTML = gySVG.test(svg);
}

export default `<div id="show"></div>
<code id="result"></code>`;
