import { bindAll, lookup } from '../src/utils';

const throwableLookup = (a, b) => () => lookup(a, b);

describe('utils', () => {
  describe('#lookup', () => {
    it('should throw if container it is not a valid object', () => {
      expect(throwableLookup(null, ['a', 'b'])).toThrowError(
        'the container must be a valid object.',
      );
    });

    it('should throw if deps parameter is not an valid array', () => {
      expect(throwableLookup({}, {})).toThrow('the deps parameter must be an array');
      expect(throwableLookup({}, null)).toThrow('the deps parameter must be an array');
    });

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

  describe('#bindAll', () => {});
});
