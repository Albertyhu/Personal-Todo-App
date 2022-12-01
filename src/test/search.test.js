import { SearchQuery } from '../screens/todo/searchFunction.js';

describe('Test search query function', () => {
  var list = [
    'Buy Groceries',
    'Build dog house',
    'Write essay',
    'Bake cake',
    'Study chemistry',
    'Read Harry Potter'
  ];
  it("Test function with the word 'buy'", () => {
    var result = SearchQuery('Buy', list);
    expect(result).toEqual(expect.arrayContaining(['Buy Groceries']));
  });

  it("Test function with the word 'do'", () => {
    var result = SearchQuery('do', list);
    expect(result).toEqual(expect.arrayContaining(['Build dog house']));
  });

  it("Test function with the word 'bU'", () => {
    var result = SearchQuery('bU', list);
    expect(result).toEqual(expect.arrayContaining(['Buy Groceries', 'Build dog house']));
  });
});
