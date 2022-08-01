// 5) Get a SVG element

export const description = `
get and wrap an existing SVG element
`;

export function script () {
  const div      = document.querySelector('div#show');
  const code     = document.querySelector('code#result');
  const el       = div.querySelector('svg');
  code.innerHTML = gySVG(el).source().replace(/</g, '&lt;');
}

export default `
<div id="show">
  <svg viewBox="0,0,100,100" width="100" height="100">
    <line x1="10" y1="10" x2="90" y2="90" stroke="black" stroke-width="10"></line>
    <line x1="10" y1="90" x2="90" y2="10" stroke="black" stroke-width="10"></line>
  </svg>
</div>
<code id="result"></code>
`;
