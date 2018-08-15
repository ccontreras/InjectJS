import { add } from '../container';
import { inject } from './inject';

// TODO: Add more / Refactor this tests

describe('inject', () => {
  beforeEach(() => {
    add('A', 1);
    add('B', 2);
  });

  it('should inject A dependency correctly', () => {
    class Foo {
      @inject('A', 'B')
      foo(a, b) {
        return a + b;
      }
    }

    const foo = new Foo();

    expect(foo.foo()).toBe(3);
  });
});
