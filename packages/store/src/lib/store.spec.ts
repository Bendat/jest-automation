import 'reflect-metadata'
import Store, { StoreAction } from "./store";

const noHistoryMessage = (name: string) =>
  `${name} has no history in this Store instance. No attempt has been made to add it.`;
const missingValueMessage = (name: string, action: StoreAction) =>
  `Cannot ${action} a null or undefined value for ${name}`;
describe('Test Context', () => {
  describe('Put', () => {
    it('should throw an error for an undefined value', () => {
      const sut = new Store();
      const action = () => sut.put('a', undefined);
      const expected = missingValueMessage('a', StoreAction.PUT);
      expect(action).toThrow(expected);
    });

    it('should throw an error for a null value', () => {
      const sut = new Store();
      sut.put('a', null, false);
      const action = () => sut.put('a', null);
      const expected = missingValueMessage('a', StoreAction.PUT);
      expect(action).toThrow(expected);
    });

    it('should accept an undefined value if configured to', () => {
      const sut = new Store();
      const action = () => sut.put('a', undefined, false);
      const expected = missingValueMessage('a', StoreAction.READ);
      expect(action).not.toThrow(expected);
    });

    it('should accept an null value if configured to', () => {
      const sut = new Store();
      const action = () => sut.put('a', null, false);
      const expected = missingValueMessage('a', StoreAction.READ);
      expect(action).not.toThrow(expected);
    });
  });
  describe('read', () => {
    it('should throw an error for an undefined value', () => {
      const sut = new Store();
      const action = () => sut.read('a');
      const expected = missingValueMessage('a', StoreAction.READ);
      expect(action).toThrow(expected);
    });

    it('should throw an error for a null value', () => {
      const sut = new Store();
      sut.put('a', null, false);
      const action = () => sut.read<boolean>('a');
      const expected = missingValueMessage('a', StoreAction.READ);
      expect(action).toThrow(expected);
    });

    it('accept a undefined value if configured to', () => {
      const sut = new Store();
      const action = () => sut.read('a', false);
      const expected = missingValueMessage('a', StoreAction.READ);
      expect(action).not.toThrow(expected);
    });

    it('accept a null value if configured to', () => {
      const sut = new Store();
      sut.put('a', null, false);
      const action = () => sut.read<boolean>('a', false);
      const expected = missingValueMessage('a', StoreAction.READ);
      expect(action).not.toThrow(expected);
    });

    it('should successfully read a value', () => {
      const sut = new Store();
      sut.put('a', true);
      const result = sut.read<boolean>('a');
      expect(result).toEqual(true);
    });
  });
  describe('Generate Report', () => {
    it('Generates an empty report', () => {
      const sut = new Store();
      const result = sut.generateReport();
      expect(result).toStrictEqual({});
    });
    it('Generates an test report', () => {
      const sut = new Store();
      sut.put('a', true);
      sut.put('b', false);
      const result = sut.generateReport();
      expect(result).toStrictEqual({
        a: { successes: 1, failures: 0, values: [true] },
        b: { successes: 1, failures: 0, values: [false] },
      });
    });
    it('Generates an test report for a single entry', () => {
      const sut = new Store();
      sut.put('a', true);
      sut.put('b', false);
      const result = sut.generateReport('a');
      expect(result).toStrictEqual({
        name: 'a',
        successes: 1,
        failures: 0,
        values: [true],
      });
    });
    it('displays an error message when filtered to an unknown property', () => {
      const sut = new Store();
      const result = sut.generateReport('a');
      expect(result).toStrictEqual({
        error: { message: noHistoryMessage('a') },
      });
    });
  });
});

/// test logs? overwrites displaying wrong value
