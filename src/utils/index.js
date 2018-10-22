import * as _ from 'lodash';

/**
 * This looks into the container looking for satisfying
 * dependencies by keys. When no deps are satisfied it will
 * throw an exception.
 * @param {object} container the container object.
 * @param {array} deps the dependencies keys to lookup in container.
 */
export function lookup(container, deps) {
  const unsatisfied = [];
  const resolved = deps.reduce((a, b) => {
    if (!_.has(container, b)) {
      unsatisfied.push(b);
    } else {
      a.push(container[b]);
    }
    return a;
  }, []);
  if (!_.isEmpty(unsatisfied)) {
    throw new Error(`the container does not contains these items: ${unsatisfied.join(', ')}`);
  }
  return resolved;
}

/**
 * This binds values from <code>deps</code> into the target
 * as arguments.
 * @param {any} context the context to bind.
 * @param {Function} target the target function to bind into.
 * @param {Array} deps array of values to bind.
 */
export function bindAll(context, target, deps) {
  let _target = target;
  while (deps.length > 0) {
    _target = _target.bind(context, deps.shift());
  }
  return _target;
}
