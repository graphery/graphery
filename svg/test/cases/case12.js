// 12) check if a native SVG is wrapped

export const description = `
gySVG.isWrapped() return false with a no wrapped element
`;

export function script () {
  const div      = document.querySelector('#show');
  const code     = document.querySelector('#result');
  const svg      = div.querySelector('svg');
  code.innerHTML = gySVG.isWrapped(svg) ? 'is wrapped reference' : 'is not wrapped reference';
}

export default `<div id="show">
  <svg viewBox="0,0,100,100" width="100" height="100">
    <line x1="10" y1="10" x2="90" y2="90" stroke="black" stroke-width="10"></line>
    <line x1="10" y1="90" x2="90" y2="10" stroke="black" stroke-width="10"></line>
  </svg>
</div>
<code id="result"></code>`;
