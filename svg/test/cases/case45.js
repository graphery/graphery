// 45) add a plugin with call replacer

export const description = `
define and add a plugin with call replacer
`;

export function script () {
  const div    = document.querySelector('#show');
  const code   = document.querySelector('#result');
  const svg    = gySVG().viewBox(0, 0, 100, 100).width(100).height(100);
  const circle = svg.add('circle').cx(50).cy(50).r(40);
  svg.attachTo(div);
  gySVG.extend((gySVG, gySVGObject) => {
    Object.assign(
      gySVGObject.prototype,
      {
        _call (wrapper, member, args) {
          if (member === 'fill' && args[0] === 'blue') {
            wrapper.el.setAttribute('fill', 'lightblue');
            return false;
          }
        }
      }
    );
  });
  circle.fill('blue');
  code.innerHTML = div.outerHTML.replace(/</g, '&lt;');
}

export default `<div id="show"></div>
<code id="result"></code>`;
