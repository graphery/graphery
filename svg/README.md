# ![graphery](https://cdn.graphery.online/img/gy.svg) Graphery SVG - gySVG

A excellent library to easily create and manipulate SVG in Javascript. Based on the proxy, it 
offers a simple API, very close to the native structure of SVG.

See the complete documentation in <https://www.graphery.org/svg/>

### Table of Contents

-   [Introduction](#introduction)

    -   [Goal: reduce code complexity](#goal-reduce-code-complexity)
    -   [API style: method chaining](#api-style-method-chaining)
    -   [Browser support](#browser-support)
    -   [Framework support](#framework-support)
    -   [Server-side rendering](#server-side-rendering)
    -   [Extensible](#extensible)

-   [Load](#load)

    -   [From CDN](#from-cdn)
    -   [Install locally with NPM](#install-locally-with-npm)

## Introduction

**Graphery SVG** (**gySVG**) is a tiny, fast, and powerful library to simplify the construction and
manipulation of SVG graphs from Javascript.

-   **Tiny**: the minimized library size is less than 3 KB, and this value can be reduced to 1.5 KB
    with gzip.

-   **Fast**: benchmarking with the excellent SVG.JS library is very good. For the same process, gySVG
    takes 20ms and SVG.js more than 40ms.

-   **Powerful**: you can use all attributes, properties, and methods of SVG versions 1.0, 1.1, and 
    2.0. The API is straightforward and very close to the SVG structure.

### Goal: reduce code complexity

**Why** a new SVG library? In the Graphery projects, we have intensively created and manipulated 
SVG graphics from Javascript. After evaluating all SVG libraries, we were aware of the need to 
build a new library much smaller, faster, and closer to the SVG format. The result is gySVG, a 
simple library that provides an easy way to work with SVG without penalizing the project 
performance or size.

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

gySVG simplifies the creation and manipulation through a set of very light methods that fit SVG
DOM attributes, properties, and methods. This is the equivalent code write with gySVG:

```js
const svg = gySVG().width('100px').height('100px');
const rect = svg.add('rect').x(10).y(10).width(90).height(90).fill('#f06');
svg.attachTo('#drawing');
```

The result is an entirely valid SVG that can be used without limitations as part of the HTML DOM.



### API style: method chaining

In gySVG, all are methods, thus, when you want to work with SVG attributes or properties, you
must use methods. For example, set an `id` to an SVG element is `element.id('unique_id')` and
for getting this identification it's necessary to use `element.id()`.

gySVG builds dynamically by proxies the methods, and these methods can be chained together to 
simplify successive calls. Each call returns the original wrapper, and you can include one call 
after another.

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

The magic of gySVG is the use of `Proxy`, one of the most powerful features of ES6. Javascript's
proxies allow creating the wrappers dynamically for each SVG element, reduce the library's 
size, and keep the performance.

Proxy is supported by:

-   Microsoft Edge 12, and later
-   Firefox 18, and later
-   Chrome 49, and later
-   Safari 10 desktop and mobile, and beyond
-   Opera 36, and later

`Proxy` is not supported by Internet Explorer 11 (and it's not possible to use polyfills or 
transpilers for this feature). If you need compatibility with old browsers, use other excellent 
libraries as:

-   [svg.js](https://svgjs.com/) 
-   [snap.svg](http://snapsvg.io/).

### Framework support

This library can be used from vanilla Javascript and frameworks like React, Vue, Svelte, Stencil, or
Angular. gySVG is agnostic to the frameworks; it always works on the SVG element. If your
framework covers SVG elements, you should keep in mind that gySVG only works with native elements.

### Server-side rendering

gySVG is ready to work both on the client and the server. This library is tested with 
[Node](https://nodejs.org/) and [JSDom](https://github.com/jsdom/jsdom) for server-side 
rendering (SSR). You can put the SVG generated into the DOM or obtain the SVG code directly 
with `svg.source()`. 

### Extensible

Although the functionality of gySVG is extensive, there are always some features that are not 
available from the beginning. This library can be extended with new functionality by 
[plugins](https://www.graphery.org/svg/16-Plugins.html). In that guide, you will see some examples and learn how to create your 
extension step by step.  

## Load

### From CDN

#### Import module

The easiest way to use gySVG library is to import it as an ES module from our CDN service:

```js
import gySVG from 'https://cdn.graphery.online/0.1.5/svg/module/index.js';
```

#### script source

Another way, very easy too, is to load the script version from our CDN with a tag `<script>`:

```html
<script src="https://cdn.graphery.online/0.1.5/svg/script/index.js"></script>;
```

#### Understanding the URL from CDN

This is the detailed description about CDN URL:

     https://cdn.graphery.online/0.1.5/svg/module/index.js
    |------|--------------------|-----|---|------|--------|
        |            |             |    |     |       |------> file name
        |            |             |    |     |--------------> 'module' or 'script' mode
        |            |             |    |--------------------> library name
        |            |             |-------------------------> version
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
