import * as _ from 'lodash';

export function lookup(container, deps) {
  if (!_.isPlainObject(container)) throw new Error('the container must be a valid object.');
  if (!_.isArrayLikeObject(deps)) throw new Error('the deps parameter must be an array');
  const notFoundDeps = [];
  const resolvedDeps = deps.reduce((a, b) => {
    if (!_.has(container, b)) {
      notFoundDeps.push(b);
    } else {
      a.push(container[b]);
    }
    return a;
  }, []);
  if (!_.isEmpty(notFoundDeps)) {
    throw new Error(`the container does not contains these items: ${notFoundDeps.join(', ')}`);
  }
  return resolvedDeps;
}

export function bindAll(context, target, deps) {
  let _target = target;
  while (deps.length > 0) {
    _target = _target.bind(context, deps.shift());
  }
  return _target;
}
