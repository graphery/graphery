/* Graphery SVG library - 0.1.2 */ (()=>{var c=Object.defineProperty;var i=r=>c(r,"__esModule",{value:!0}),l=(r,n)=>{i(r);for(var e in n)c(r,e,{get:n[e],enumerable:!0})};let o={};l(o,{createArc:()=>d,degrees2radians:()=>p,polarToCartesian:()=>s});function p(r){return(r-90)*Math.PI/180}function s(r,n,e,t){let a=p(t);return{x:r+e*Math.cos(a),y:n+e*Math.sin(a)}}function d(r,n,e,t,a){let m=s(r,n,e,a),u=s(r,n,e,t),b=a-t<=180?"0":"1";return`M${m.x},${m.y}A${e},${e},0,${b},0,${u.x},${u.y}`}let g=typeof gobalThis!="undefined"?globalThis:window;Object.assign(g.gySVG,g.gySVG||{},o);})();