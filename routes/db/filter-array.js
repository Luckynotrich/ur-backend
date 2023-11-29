// filter-array.js
const { getMissingValues } = require('./insert-prefs-db.js');

// const oldPrefs = [{ pref: '123', procon: 'f' }/*, { pref: '456', procon: 'f' }, { pref: '789', procon: 't' }, { pref: '012', procon: 't' }, { pref: '345', procon: 'f' }*/, { pref: '890', procon: 't' }];
// const newPrefs = [{ pref: '123', procon: 'f' }, { pref: '456', procon: 'f' }, { pref: '012', procon: 't' }, { pref: '345', procon: 't' }, { pref: '678', procon: 't' }, { pref: '901', procon: 't' }];

const oldPrefs =  [
    { pref: 'A fresh dube', procon: 't' },
    { pref: 'Bowling', procon: 't' },
    { pref: 'Work', procon: 'f' }
  ]
//   const newPrefs =  [
//     { pref: 'A fresh dube', procon: 't' },
//     { pref: 'Bowling', procon: 't' },
//     { pref: 'White Russians', procon: 't' },
//     { pref: 'Work', procon: 'f' },
//     { pref: 'Total Aggression, man!', procon: 'f' }
//   ]
  const newPrefs =[
    {
      pref: "A fresh dube",
      procon: "t",
    },
    {
      pref: "Bowling",
      procon: "t",
    },
    {
      pref: "White Russians",
      procon: "t",
    },
    {
      pref: "Total Aggression, man!",
      procon: "f",
    },
  ]
const deleteValues = getMissingValues(oldPrefs, newPrefs);
console.log('deleteValues = ', deleteValues);

const writeValues = getMissingValues(newPrefs, oldPrefs);
console.log('writeValues = ', writeValues);


