# ![graphery](https://cdn.graphery.online/img/gy.svg) Graphery SVG - gySVG

An excellent library for easily creating and manipulating SVG in Javascript. It offers a simple API, very close to the 
native SVG structure, powerful support for animations, tiny size, and fast speed.

See the complete documentation in <https://www.graphery.org/svg/>

### Table of Contents

-   [Introduction](#introduction)

    -   [Goal: reduce code complexity](#goal-reduce-code-complexity)
    -   [API style: method chaining](#api-style-method-chaining)
    -   [Browser support](#browser-support)
    -   [Framework support](#framework-support)
    -   [Extensible](#extensible)

-   [Load](#load)

    -   [From CDN](#from-cdn)
    -   [Install locally with NPM](#install-locally-with-npm)

## Introduction

**Graphery SVG** (**gySVG**) is a powerful library to simplify the construction and manipulation of SVG graphics from 
Javascript.

-   **Simple**: the API is very close to the SVG structure. It is straightforward to use. If you know the SVG format, you 
    know Graphery SVG API. If you learn Graphery API, you learn SVG format.

-   **Fast**: the performance in comparison with other libraries is excellent. For the same process, Graphery SVG takes 50% 
    of the time than others.
      

-   **Tiny**: the minimized size of the library is &lt;5KB uncompressed and &lt;3KB gzipped. No external dependencies, all in 
    one.

-   **Powerful**: can use all attributes, properties, and methods of SVG 1.0, 1.1, and 2.0 versions. In addition, you can 
    use the DOM properties and methods. You can extend the core features with plugins.

### Goal: reduce code complexity

Why a new SVG library? We have intensively created and manipulated SVG graphics from Javascript in our projects. 
After evaluating all SVG libraries, we were aware of the need to build a new library much smaller, faster, and closer 
to the SVG format. The result is Graphery SVG, a simple library that provides an easy way to work with SVG without 
penalizing the project performance or size.

The Javascript source code for creating and manipulating SVG elements tends to grow and becomes
challenging to understand and maintain code. Creating a simple SVG requires many lines of code 
with Vanilla Javascript.

```js
const div = document.querySelector('#drawing');
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
```

Graphery SVG simplifies the creation and manipulation through very light methods that fit SVG
DOM attributes, properties, and methods. The equivalent code written with Graphery SVG is:

```js
const svg = gySVG().width('100px').height('100px');
const rect = svg.add('rect').x(10).y(10).width(90).height(90).fill('#f06');
svg.attachTo('#drawing');
```

The result is an entirely valid SVG that can be used without limitations as part of the HTML DOM.

```xml
<svg viewBox="0,0,100,100" width="100px" height="100px">
  <rect x="10" y="10" width="90" height="90" fill="#f06"></rect>
</svg>
```

### API style: method chaining

In Graphery SVG, all are methods; thus, when you want to work with SVG attributes or properties, you
must use methods. For example, set an `id` to an SVG element is `element.id('unique_id')` and
for getting this identification it is necessary to use `element.id()`.

Graphery SVG dynamically constructs the methods, which can chain together to make successive calls. Each call returns 
the original object and can include one call after another.

```js
const svg = gySVG()
  .width('100%')
  .height('100%');
svg.add('rect')
  .x(10)
  .y(10)
  .width(90)
  .height(90)
  .fill('#f06');
```

**Note**: chained call is possible when calling setter methods. When a getter method (then 
returns a value) is called the value property is returned, it is impossible to do more chained
calls.

### Browser support

The magic of Graphery SVG is the use of `Proxy`, one of the most powerful features of ES6. Javascript's proxies allow 
the wrapper creation for each SVG element, reduce the library's size, and keep the performance.

Javascript Proxy, and as a result, Graphery SVG is supported by:

-   Microsoft Edge 12, and later
-   Firefox 18, and later
-   Chrome 49, and later
-   Safari 10 desktop and mobile, and beyond
-   Opera 36, and later

### Framework support

This library can be used from vanilla Javascript and frameworks like React, Vue, Svelte, Stencil, or Angular. Graphery 
SVG is agnostic to the frameworks; it always works on the SVG. If your framework covers SVG elements, you 
should remember that Graphery SVG only works with native SVG elements.

### Extensible

Although the functionality of Graphery SVG is extensive, there are always some features that are not 
available from the beginning. This library can be extended with new functionality by plugins.  

## Load

### From CDN

#### Import module

The easiest way to use Graphery SVG library is to import it as an ES module from our CDN service:

```js
import gySVG from 'https://cdn.graphery.online/svg/1.0.0/module/index.js';
```

#### script source

Another way, very easy too, is to load the script version from our CDN with a tag `<script>`:

```html
<script src="https://cdn.graphery.online/svg/1.0.0/script/index.js"></script>;
```

#### Understanding the URL from CDN

This is the detailed description about CDN URL:

     https://cdn.graphery.online/svg/1.0.0/module/index.js
    |------|--------------------|---|-----|------|--------|
        |            |            |    |      |       |------> file name
        |            |            |    |      |--------------> 'module' or 'script' mode
        |            |            |    |---------------------> version
        |            |            |--------------------------> library name
        |            |---------------------------------------> CDN domain
        |----------------------------------------------------> protocol (please, use 'https')

### Install locally with NPM

See <https://www.npmjs.com/package/@graphery/svg>.

You can install the Graphery SVG library locally by NPM:

```bash
npm install @graphery/svg
```

If you have installed locally, you need to reference `node_modules/@graphery/svg` and use this
code for import. 

```js
import SVG from './node_modules/@graphery/svg/index.js';
```

or as script with

```html
<script src="./node_modules/@graphery/svg/script/index.js"></script>
```

If you use Webpack or other loaders, you may be able to omit the `node_modules` folder in these 
calls.

./
