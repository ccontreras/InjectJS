/**
 * This is a basic in-memory container that will
 * store all the dependencies in an array.
 * @author Cesar Contreras
 * @version 1.0.0
 */

let container = {};

/**
 * Exposes an inmutable container object.
 */
export function getContainer() {
  return Object.freeze({ ...container });
}
/**
 * Adds a service into the container.
 * @param {string} key the service identifier.
 * @param {any} value the service or value.
 */
export function add(key, value) {
  container[key] = value;
}

/**
 * Removes a service from the container.
 * @param {string} key the service identifier.
 */
export function remove(key) {
  if (!(key in container)) {
    throw new Error(`A service with key "${key}" is not stored.`);
  }
  delete container[key];
}

/**
 * Deletes container from memory
 */

export function removeAll() {
  container = {};
}
