import { add, removeAll } from '../src/container';
import { inject } from '../src/inject';

const addAll = (o) => {
  Object.keys(o).forEach(n => add(n, o[n]));
};

describe('inject', () => {
  beforeEach(() => {
    addAll({ A: 1, B: 2 });
  });

  afterEach(() => {
    removeAll();
  });

  it('should inject A dependency correctly', () => {
    class FooMock {
      @inject('A', 'B')
      foo(a, b) {
        return a + b;
      }
    }

    const fooMock = new FooMock();
    expect(fooMock.foo()).toBe(3);
  });

  it('should throw if at least one dependency is not satisfied', () => {
    expect(
      () => class FooMock {
          @inject('A', 'B', 'C')
        foo(a, b, c) {
          return a + b + c;
        }
      },
    ).toThrow();
  });
});
