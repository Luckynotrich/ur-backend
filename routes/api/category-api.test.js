const router = require ('./category-api');
arrayifyPrefs = router.arrayifyPrefs;

describe('arrayifyPrefs', () => {
  it('should update category with new preferences', () => {
    const category = ['apple', 'banana', 'orange'];
    const update = ['pear', 'kiwi'];
    arrayifyPrefs(category, update);
    console.log('category = ', category)
    expect(category).toEqual(['pear', 'kiwi']);
  });
  it('should add new preferences to category if update is longer', () => {
    const category = ['apple', 'banana', 'orange'];
    const update = ['pear', 'kiwi', 'grape', 'mango'];
    arrayifyPrefs(category, update);
    console.log("'pear', 'kiwi', 'grape', 'mango'= ", category)
    expect(category).toEqual(['pear', 'kiwi', 'grape', 'mango']);
  });
  it('should remove preferences from category if update is shorter', () => {
    const category = ['apple', 'banana', 'orange'];
    const update = ['pear'];
    arrayifyPrefs(category, update);
    console.log('should = pear ', category)
    expect(category).toEqual(['pear']);
  });
  it('should return an empty array', () => {
    const category = ['apple', 'banana', 'orange'];
    const update = [];
    arrayifyPrefs(category, update);
    console.log('category = ', category)
    expect(category).toEqual([]);
  });
});