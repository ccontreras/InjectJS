import { add, remove, getContainer } from './container';

describe('container', () => {
  const KEY = 'Foo';
  const VAL = 1;

  it('should add a dependency into the container with key', () => {
    expect(() => add(KEY, VAL)).not.toThrowError();

    const container = getContainer();

    expect(container).toBeDefined();
    expect(Object.keys(container)).toContain(KEY);
    expect(container[KEY]).toBe(VAL);
  });

  it('should remove a dependency from the container', () => {
    expect(() => remove(KEY)).not.toThrow();
    expect(getContainer()).toEqual({});
  });
});
