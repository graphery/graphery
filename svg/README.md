# ![graphery](https://cdn.graphery.online/img/gy.svg) Graphery SVG - gySVG

See the complete documentation in <https://www.graphery.org/svg/>

## Introduction

**Graphery SVG** (**gySVG**) is a tiny, fast, and powerful library to simplify the construction and
manipulation of SVG graphs from Javascript.

-   **Tiny**: the minimized library size is 3 KB, and this value can be reduced to 1.54 KB with gzip.

-   **Fast**: benchmarking with the fast SVG.JS library is very good. For the same process, gySVG
    takes 20ms and SVG.js more than 40ms.

-   **Powerful**: you can use all attributes, properties, and methods of SVG versions 1.0, 1.1, and 
    2.0. The API is straightforward and very close to the SVG structure.

**Why** a new SVG library? In the Graphery projects, we have intensively created and manipulated 
SVG graphics from Javascript. After evaluating all SVG libraries, we were aware of the need to 
build a new library much smaller, faster, and closer to the SVG format. The result is gySVG, a 
simple library that provides an easy way to work with SVG without penalizing the project 
performance or size.

### Goal: reduce code complexity

The source code for creating and manipulating SVG elements tends to grow and becomes challenging to 
understand and maintain code. Creating a simple SVG requires many lines of code with Vanilla
Javascript.

```js
const div     = document.querySelector ('#drawing');
const svg     = document.createElementNS ('http://www.w3.org/2000/svg', 'svg');
svg.setAttribute ('width', '100%');
svg.setAttribute ('height', '100%');
div.appendChild (svg);
const rect = document.createElementNS ('http://www.w3.org/2000/svg', 'rect');
rect.setAttribute ('x', '10');
rect.setAttribute ('y', '10');
rect.setAttribute ('width', '90');
rect.setAttribute ('height', '90');
rect.setAttribute ('fill', '#F06');
svg.appendChild (rect);
```

gySVG simplifies the creation and manipulation through a set of very light methods that fit SVG
DOM attributes, properties, and methods.

This is the equivalent code write with gySVG:

```js
const svg = gySVG().width('100%').height('100%');
const rect = svg.add('rect').x(10).y(10).width(90).height(90).fill('#f06');
svg.attachTo('#drawing');
```

The result is an entirely valid SVG that can be used without limitations as part of the HTML DOM.



```svg
<svg width="100%" height="100%">
  <rect width="100" height="100" fill="#f06"></rect>
</svg>
```

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
proxies allow create dynamically the wrappers for each SVG element, reduce the library's 
size, and keep the performance.

Proxy is supported by:

-   Microsoft Edge 12, and later
-   Firefox 18, and later
-   Chrome 49, and later
-   Safari 10 desktop and mobile, and beyond
-   Opera 36, and later

`Proxy` is not supported by Internet Explorer 11 (and it's not possible to use polyfills or 
transpilers for this feature). If you need compatibility with old browsers, use other excellent 
libraries as [svg.js](https://svgjs.com/) or [snap.svg](http://snapsvg.io/).

### Framework support

This library can be used from vanilla Javascript and frameworks as React, Vue, Svelte, Stencil, or
Angular. gySVG is agnostic to the frameworks, it always works on the SVG element. If your
framework covers SVG elements, you should keep in mind that gySVG only works with native elements.

### Server-side rendering

gySVG is ready to work both on the client and the server. This library is tested with 
[Node](https://nodejs.org/) and [JSDom](https://github.com/jsdom/jsdom) for server-side 
rendering (SSR). You can put the SVG generated into the DOM or obtain directly the SVG code 
with `svg.source()`. 

### Extensible

Although the functionality of gySVG is very extensive, there are always some features that are not 
available from the beginning. This library can be extended with new functionality by 
[plugins](https://www.graphery.org/gysvg/guide/15-plugins.html). In that guide, you will see some examples and learn how to create your 
extension step by step.  

## Load

### From CDN

#### Import module

The easiest way to use gySVG library is to import it as an ES module from our CDN service:

```js
import gySVG from 'https://cdn.graphery.online/svg/0.1.1/module/index.js';
```

#### script source

Another way, very easy too, is to load the script version from our CDN with a tag `<script>`:

```html
<script src="https://cdn.graphery.online/svg/0.1.1/script/index.js"></script>;
```

#### Understanding the URL from CDN

This is the detailed description about CDN URL:

     https://cdn.graphery.online/svg/0.1.1/module/index.js
    |------|--------------------|---|-----|------|--------|
        |            |            |    |      |      |-------> file name
        |            |            |    |      |--------------> 'module' or 'script' mode
        |            |            |    |---------------------> library version
        |            |            |--------------------------> library name
        |            |---------------------------------------> CDN domain
        |----------------------------------------------------> protocol (please, use 'https')

### Install locally with NPM

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

## Quick reference

### Import

```js
import gySVG from 'https://cdn.graphery.online/svg/0.1.1/module/index.js';
```

### Manage elements

#### gySVG()

```js
const mySVG = gySVG();
```

`gySVG()` creates a new SVG element and returns its _gySVG wrapper_ object.

#### gySVG(element)

```html
<svg id="mySvg"></svg>
```

```js
const el    = document.querySelector('#mySvg');
const mySVG = gySVG(el);
```

`gySVG( element )` returns a _gySVG wrapper_ object over an existing SVG element.

#### gySVG(tag_name)

```js
const mySVG  = gySVG();
const myRect = gySVG('rect');
myRect.attachTo(mySVG);
```

`gySVG( tag_name )` create a new SVG element and returns its wrapper object. This element must be
attached into an SVG element with `.attachTo()`.

#### _element_.add(_tag_name_)

```js
const rect = parentElement.add('rect');
```

`.add( tag_name )` creates and attach a nested SVG element and returns its _gySVG wrapper_ object.

#### _element_.attachTo(_selector_\|_element_)

```html
<div id="content"></div>
```

```js
const mySvg = gySVG();
mySvg.attachTo('#content');
```

`element.attach(selector|element)` add the SVG element into the DOM. This method receive as
parameter a string with a selector or a DOM element and put the SVG element into this.

#### _element_.remove()

```js
element.remove();
```

`.remove()` deattach the object from the parent element.

#### _element_.cloneNode([true])

```js
const svg = gySVG();
const circle1 = svg.add('circle');
const circle2 = circle1.cloneNode().attachTo(svg);
```

`.cloneNode()` create an element copy. If the parameter is `true`, the copy is in deep and other
child elements are copied too. A clone node must be attached to an element with `.attachTo()`. 

#### _element_.children()

```js
for (let el of element.children()) {
  //...
}
```

`.children()` returns an array with all nested elements.

#### _element_.parent()

```js
const g = line.parent();
```

`.parent()` returns the parent object or null if not exist.

#### _element_.querySelector() and _element_.querySelectorAll()

```js
const lines = svg.querySelectorAll('line');
```

You can get any nested element with `.querySelector()` or `.querySelectorAll()` with a CSS
selector as parameter.

### Manage attributes

All _gySVG wrapper_ object has a group of methods to get and set attributes very quickly.

#### _element_._attribute_name_()

```js
const mySvg = gySVG().viewBox('0 0 100 100').width('100px');

if (mySvg.width() === '100px') {
  mySvg.height('100px')
}
```

To get an attribute value is very simple. You must use the attribute name as a method, and the
value is returned.

#### _element_._attribute_name_(value)

```js
const mySvg = gySVG().viewBox('0 0 100 100').width('100px').height('100px');
mySvg.add('rect').x(10).x(20).width(10).height(20).fill('#F60');
```

To set an attribute you must use the wrapper with the attribute name, which now refers to
a method. This function receives the new value and returns the wrapper object, and as a result, 
you can nest the calls. 

::: warning
If you call to an unknown or wrong attribute name, an attribute with that name is created.
:::

#### Attribute names

SVG element attributes are converted to methods by replacing hyphen (`-`) with underscore (`_`). 
The rest of the name stays the same. Here are some examples:

| attribute name | gySVG method      |
| -------------- | ----------------- |
| `x`            | `.x()`            |
| `viewBox`      | `.viewBox()`      |
| `stroke-width` | `.stroke_width()` |

#### Complementary methods

##### _element_.id()

It returns the current unique identification.

##### _element_.href()

It returns the unique identification as a `#id`

##### _element_.url()

It returns the unique identification as a `url(id)`

### Manage properties

#### _element_._property_name_()

```js
const svg = gySVG().viewBox('0 0 100 100');
console.log(svg.hidden());
```

If you need get a property (non an attribute) you can use the property name for getting a function
which return the property value.

#### _wrapper_._property_name_(value)

```js
const svg = gySVG().viewBox('0 0 100 100');
svg.hiden(true);
```

Update a property is very simple, only you need to call the property function with the new value
as parameter. This function return the wrapper object, as a result, you can nest the calls too.

```js
const svg = SVG()
  .viewBox('0 0 100 100')
  .hidden(true)
  .width('100px')
  .height('100px');
```

#### Property names

The properties of the SVG elements are converted to gySVG in methods keeping the same original name.

| property name         | gySVG method            |
| --------------------- | ----------------------- |
| `.tagName`            | `.tagName()`            |
| `.nextElementSibling` | `.nextElementSibling()` |
| `.attributes`         | `.attributes()`         |

#### Access to property object

Some properties such as "style" or "classList" are objects. In these cases you can access to deep 
properties as methods.  

`.classList` object kept the original methods:

| method name             | gySVG method            |
| ----------------------- | ----------------------- |
| `.classList.add()`      | `.classList.add()`      |
| `.classList.remove()`   | `.classList.remove()`   |
| `.classList.contains()` | `.classList.contains()` |

```js
const svg = SVG().viewBox('0 0 100 100');
svg.classList.add('test')
```

`style` is a very special case because is an attribute and a deep object with properties. In this
case you can use `.style()` to access as attribute and `.style.` to access its child properties.

The properties of the \`.style' object are wrapped and its properties are now methods with the same
name as the original property name:

| style name        | gySVG method        |
| ----------------- | ------------------- |
| `.style.fontSize` | `.style.fontSize()` |
| `.style.color`    | `.style.color()`    |
| `.style.fill`     | `.style.fill()`     |

```js
const svg = SVG().viewBox('0 0 100 100').style('stroke: #000');
svg.style.strokeWidth('10px');
```

::: tip Note
Many SVG attributes are visuals and can also be used as properties CSS, so in gySVG you 
can choose to use  `.stroke_width()` or `.style.strokeWidth()`.
:::

### Manage methods

SVG element methods are converted directly into gySVG methods without changes in its behavior, 
parameters, or return.

| method name           | gySVG method          |
| --------------------- | --------------------- |
| `.getScreenCTM()`     | `.getScreenCTM()`     |
| `.addEventListener()` | `.addEventListener()` |
| `.cloneNode()`        | `.cloneNode()`        |

These methods receive the same parameters and return the same values as the original method except: 

-   if the return is `undefined`, the wrapped element is returned. 
-   if the return is an SVG element or an array of SVG elements, those elements are converted into a 
    _gySVG wrapped_ object.

```js
const circles = element.querySelectorAll('circle'); // return an array with gySVG wapped objects
```

### Simple animation

#### _element_.animateTo(properties[, duration])

We recommend using CSS animations or SMIL animations. In some cases, these animations are not 
possible or have limitations. For those cases, the method `.animateTo()` which progressively 
modifies attributes from the original values to destination values within the set time.

-   `properties`: is an object with the attributes or properties names as keys and target value as
    values.

-   `duration`: is a number than defines, in milliseconds, the animation's time. The default value is
    200 (fast animation).

```js
const svg = SVG().viewBox('0 0 100 100');
svg.add ('circle').cx (10).cy (10).r (0)
  .animateTo({r: 10});
svg.add ('circle').cx (30).cy (10).r (10)
  .animateTo({r: 0});
```

### Content and source

#### _element_.content()

```js
const svg = gySVG().viewBox('0 0 100 100');
svg.add('circle').r(10).cx(50).cy(50);
console.log(svg.content());
```

If you need to get the SVG element content as a text, you can use the method `.content()` without
parameters. This method return the current inner SVG elements.

#### _element_.content(source)

```js
const svg = gySVG().viewBox('0 0 100 100');
svg.content(`<circle r="10" cx="50" cy="50"></circle>`);
```

If you need to put the SVG element content from a text, you can use the method 
`.content(source)`. This method return the current _gySVG wrapper_ and put the text as inner
source.

#### _element_.source()

```js
const svg = gySVG().viewBox('0 0 100 100');
svg.add('circle').r(10).cx(50).cy(50);
console.log(svg.source());
```

If you need to get the element source, included the element, you can use `.source()`. This method
return the source element as a text.

### Original SVG object

#### _element_.el

```js
const svg = gySVG().viewBox('0 0 100 100');
document.querySelector('#container').appendChild(svg.el);
```

In some cases you need the original element wrapped by `gySVG()` or `.add()`. In these cases you
can get the original element wrapped with the attribute `.el`.

### Is a gySVG wrapper?

#### gySVG.isWrapped(object)

```js
const svg = gySVG();
console.log( gySVG.isWrapped( svg ) );    // true
console.log( gySVG.isWrapped( svg.el ) ); // false
```

If you have an object, and you need to check if is a wrapper, use `SVG.isWrapped()`.

./
