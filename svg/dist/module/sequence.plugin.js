let i=(t,n)=>typeof t===n,p="function",f="number",d="string",h="element not found";class g{gySVG=null;#t=null;#e=[];#n;#s;constructor(t,n,e,s){this.gySVG=t,this.#t=n,this.#n=typeof e=="function"?e:()=>{},this.#s=typeof s=="function"?s:()=>{}}get prev(){let t=this.#e[this.#e.length-1];let n=t[2];return{end:(e=0)=>(n.delay||0)+(n.duration||200)+e,begin:(e=0)=>(n.delay||0)+e}}step(t){let n=i(t,f)?this.#e[t]:this.#e.find(s=>s[0]===t);if(!n)throw new Error(h);let e=n[2];return{end:(s=0)=>(e.delay||0)+(e.duration||200)+s,begin:(s=0)=>(e.delay||0)+s}}get steps(){return this.#e.slice()}add(...t){return this.#e.push(t),this}play(){let t=this.#s;let n=this.#e.length;this.#n();for(let e of this.#e){let s=i(e[0],d)?this.#t.querySelector(e[0]):e[0],a=e[1],u=e[2],c=e[3]||null,r=e[4]||null;s.animateTo(a,u,c,function(...l){i(r,p)&&r.apply(this,l),--n||t()})}}}function o(t,n){Object.assign(n.prototype,{Seq(e,s){return new g(t,this,e,s)}})}var m=o;export{m as default};