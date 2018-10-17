import {
  add, remove, removeAll, getContainer,
} from '../src/container';

describe('container', () => {
  const key = 'Foo';
  const val = 1;

  it('should add a dependency into the container with key', () => {
    expect(() => add(key, val)).not.toThrowError();

    const container = getContainer();

    expect(container).toBeDefined();
    expect(Object.keys(container)).toContain(key);
    expect(container[key]).toBe(val);
  });
  it('should get immutable container', () => {
    add(key, val);
    const container = getContainer();
    expect(Object.isFrozen(container)).toBe(true);
  });
  it('should remove a dependency from the container', () => {
    expect(() => remove(key)).not.toThrow();
    expect(getContainer()).toEqual({});
  });
  it('should remove all dependencies from container', () => {
    add(key, val);

    let container = getContainer();
    expect(container).toBeDefined();

    expect(() => removeAll()).not.toThrow();
    container = getContainer();
    expect(container).toEqual({});
  });
});
