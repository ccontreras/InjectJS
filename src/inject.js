import { getContainer } from './container';
import { bindAll, lookup } from './utils';

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
    const _descriptor = Object.assign(descriptor);
    _descriptor.value = bindAll(target, actual, toInject);
    return _descriptor;
  };
}
