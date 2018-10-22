import { bindAll, lookup } from '../src/utils';

const throwableLookup = (a, b) => () => lookup(a, b);

describe('utils', () => {
  describe('#lookup', () => {
    describe('dependency availability', () => {
      it('should throw if none dependency is available', () => {
        expect(throwableLookup({ a: 1, b: 2 }, ['x', 'y'])).toThrowError(
          'the container does not contains these items: x, y',
        );
      });

      it('should throw if at least one dependency is not satisfied', () => {
        expect(throwableLookup({ a: 1, b: 2 }, ['a', 'b', 'c'])).toThrowError(
          'the container does not contains these items: c',
        );
      });
    });

    it('should throw if none dependency exists in container', () => {
      expect(throwableLookup({}, ['a'])).toThrowError(
        'the container does not contains these items: a',
      );
    });

    it('should resolve to a valid array if dependencies are satisfied', () => {
      const container = { a: 1, b: 2 };
      const values = lookup(container, ['a', 'b']);

      expect(values).toBeInstanceOf(Array);
      expect(values).toHaveLength(2);
      expect(values).toContain(1);
      expect(values).toContain(2);
    });
  });

  describe('#bindAll', () => {
    it('should bind function with dependencies', () => {
      const toBind = (a, b) => a + b;
      const bound = bindAll(null, toBind, [2, 2]);

      expect(bound()).toBe(4);
    });

    it('should bind only passed dependencies in order', () => {
      const toBind = (a, b, c) => a + b + c;
      const bound = bindAll(null, toBind, [2, 2]);

      expect(bound(3)).toBe(7);
    });
  });
});
