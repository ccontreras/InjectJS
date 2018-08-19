import { add, remove, removeAll, getContainer } from './container';

describe('container', () => {
  const KEY = 'Foo';
  const VAL = 1;
  const getKey = len => {
    let txt = '';
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for(let i = 0; i < len; i++) {
      txt += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return txt;
  }

  it('should add a dependency into the container with key', () => {
    expect(() => add(KEY, VAL)).not.toThrowError();

    const container = getContainer();

    expect(container).toBeDefined();
    expect(Object.keys(container)).toContain(KEY);
    expect(container[KEY]).toBe(VAL);
  });
  it('should get immutable container', () => {
    add(KEY,VAL);
    const container = getContainer();
    const newKey = getKey(1);
    expect(Object.isFrozen(container)).toBe(true);
  });
  it('should remove a dependency from the container', () => {
    expect(() => remove(KEY)).not.toThrow();
    expect(getContainer()).toEqual({});
  });
  it('should remove all dependencies from container', () => {
    add(KEY, VAL);

    let container = getContainer();
    expect(container).toBeDefined();

    expect(() => removeAll()).not.toThrow();
    container = getContainer();
    expect(container).toEqual({});
  });
});
