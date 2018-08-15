import { getContainer } from '../container';

function lookup(container, deps) {
  return deps.reduce((a, b) => {
    a.push(container[b]);
    return a;
  }, []);
}

function bindAll(context, target, deps) {
  while (deps.length > 0) {
    target = target.bind(context, deps.shift());
  }
  return target;
}

/**
 * Injects dependencies via arguments. The values in `deps` will be injected in order
 * to the arguments.
 * @param {Array} deps an array with the names of the dependencies to be injected.
 */
export function inject(...deps) {
  return (target, key, descriptor) => {
    const actual = descriptor.value;
    const container = getContainer();
    const toInject = lookup(container, deps);
    descriptor.value = bindAll(target, actual, toInject);
    return descriptor;
  };
}
