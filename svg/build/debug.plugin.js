import plugin from '../src/debug.plugin.js';

(typeof gobalThis !== 'undefined' ? globalThis : window).gySVG.extend (plugin);
