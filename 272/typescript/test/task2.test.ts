import stringScore from '../task2';

test('Task 2: String Score', () => {
  expect(stringScore('hello')).toBe(13);
  expect(stringScore('perl')).toBe(30);
  expect(stringScore('raku')).toBe(37);
});
