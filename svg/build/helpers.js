import * as gySVGHelpers from '../src/helpers.js';

const global = (typeof gobalThis !== 'undefined' ? globalThis : window);

Object.assign (global.gySVG, global.gySVG || {}, gySVGHelpers);