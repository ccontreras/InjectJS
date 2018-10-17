import { add } from '../src/container';
import { inject } from '../src/inject';

// TODO: Add more / Refactor this tests

describe('inject', () => {
  it('should inject A dependency correctly', () => {
    // add dependencies into the container.
    add('A', 1);
    add('B', 2);

    // Create the mock class where to inject the deps.
    class FooMock {
      @inject('A', 'B')
      foo(a, b) {
        return a + b;
      }
    }

    const fooMock = new FooMock();

    expect(fooMock.foo()).toBe(3);
  });
});
