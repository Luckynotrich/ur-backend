// filter-array.js
const getMissingValues = (arr1, arr2) => {
    return arr1.filter(({pref: value,procon: bool}) => !arr2.some(obj => obj.pref === value && obj.procon === bool));
};

const oldPrefs = [/* { pref: '123', procon: 'f' }, { pref: '456', procon: 'f' }, { pref: '789', procon: 't' }, { pref: '012', procon: 't' }, { pref: '345', procon: 'f' }, { pref: '890', procon: 't' } */];
const newPrefs = [{pref:'123',procon:'f'},{pref:'456',procon:'f'}, {pref: '012',procon:'t'},{pref: '345',procon:'t'},{pref:'678',procon:'t'},{pref:'901',procon:'t'}];

const writeValues = getMissingValues(newPrefs, oldPrefs);
console.log('writeValues = ', writeValues);

const deleteValues = getMissingValues(oldPrefs, newPrefs);
console.log('deleteValues = ', deleteValues);
