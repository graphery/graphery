// 44) add a plugin

export const description = `
define and add a plugin
`;

export function script () {
  const div  = document.querySelector('#show');
  const code = document.querySelector('#result');
  const svg  = gySVG().viewBox(0, 0, 100, 100).width(100).height(100);
  svg.attachTo(div);
  gySVG.extend((gySVG, gySVGObject) => {
    Object.assign(
      gySVGObject.prototype,
      {
        test () {
          this.add('circle').cx(50).cy(50).r(40);
          return this;
        }
      }
    );
  });
  svg.add('g').test().fill('red');
  code.innerHTML = div.outerHTML.replace(/</g, '&lt;');
}

export default `<div id="show"></div>
<code id="result"></code>`;
