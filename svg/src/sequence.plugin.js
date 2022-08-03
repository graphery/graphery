const is              = (v, t) => typeof v === t;
const FUNCTION        = 'function';
const NUMBER          = 'number';
const STRING          = 'string';
const ERROR_NOT_FOUND = 'element not found';

/**
 * Animated sequence of steps
 */
class Seq {
  gySVG  = null;
  #self  = null;
  #steps = [];
  #init;
  #end;

  /**
   * Create a new sequence
   * @param {object} gySVG
   * @param {object} self
   * @param {function} [init]
   * @param {function} [end]
   */
  constructor (gySVG, self, init, end) {
    this.gySVG = gySVG;
    this.#self = self;
    this.#init = typeof init === 'function' ? init : () => undefined;
    this.#end  = typeof end === 'function' ? end : () => undefined;
  }

  /**
   * previous element
   * @returns {{end: (function(*=)), begin: (function(*=))}}
   */
  get prev () {
    let el        = this.#steps[this.#steps.length - 1];
    const options = el[2];
    return {
      end  : (n = 0) => (options.delay || 0) + (options.duration || 200) + n,
      begin: (n = 0) => (options.delay || 0) + n
    };
  }

  /**
   * get a step element
   * @param {number|string} element
   * @returns {{end: (function(*=)), begin: (function(*=))}}
   */
  step (element) {
    let el = is(element, NUMBER) ?
      this.#steps[element] :
      this.#steps.find(e => e[0] === element);
    if (!el) {
      throw new Error(ERROR_NOT_FOUND);
    }
    const options = el[2];
    return {
      end  : (n = 0) => (options.delay || 0) + (options.duration || 200) + n,
      begin: (n = 0) => (options.delay || 0) + n
    }
  }

  /**
   * get all steps
   * @returns {*[]}
   */
  get steps () {
    return this.#steps.slice();
  }

  /**
   * add new step
   * @param {object} step
   * @returns {Seq}
   */
  add (...step) {
    this.#steps.push(step);
    return this;
  }

  /**
   * run the sequence
   */
  play () {
    const globalEnd = this.#end;
    let executions  = this.#steps.length;
    this.#init();
    for (let step of this.#steps) {
      const element    = is(step[0], STRING) ? this.#self.querySelector(step[0]) : step[0];
      const properties = step[1];
      const options    = step[2];
      const start      = step[3] || null;
      const end        = step[4] || null;
      element.animateTo(properties, options, start, function (...args) {
        if (is(end, FUNCTION)) {
          end.apply(this, args)
        }
        if (!--executions) {
          globalEnd();
        }
      });
    }
  }

}

/**
 * Install sequence plugin
 * @param {object} gySVG
 * @param {object} gySVGObject
 * @example gySVG.extend(sequencePlugin)
 */
export default function sequencePlugin (gySVG, gySVGObject) {
  Object.assign(gySVGObject.prototype, {
    /**
     * Create a new animation sequence
     * @param {function} init - Callback called when start the animations sequence
     * @param {function} end  - Callback called when finish the animations sequence
     * @returns {Seq}
     * @constructor
     */
    Seq (init, end) {
      return new Seq(gySVG, this, init, end);
    }
  });
}