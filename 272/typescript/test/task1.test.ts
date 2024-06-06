import defangIpAddress from '../task1';

test('Task 1: Defang IP Address', () => {
  expect(defangIpAddress('1.1.1.1')).toBe('1[.]1[.]1[.]1');
  expect(defangIpAddress('255.101.1.0')).toBe('255[.]101[.]1[.]0');
});
