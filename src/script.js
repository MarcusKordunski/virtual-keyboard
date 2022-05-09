const keys = [
  '`',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  '-',
  '=',
  'Backspace',
  'Tab',
  'q',
  'w',
  'e',
  'r',
  't',
  'y',
  'u',
  'i',
  'o',
  'p',
  '[',
  ']',
  '/',
  'Delete',
  'CapsLock',
  'a',
  's',
  'd',
  'f',
  'g',
  'h',
  'j',
  'k',
  'l',
  ';',
  "'",
  'Enter',
  'Shift',
  '/',
  'z',
  'x',
  'c',
  'v',
  'b',
  'n',
  'm',
  ',',
  '.',
  '/',
  '↑',
  'Shift',
  'Ctrl',
  'En',
  'Alt',
  ' ',
  'Alt',
  'Ctrl',
  '←',
  '↓',
  '→',
];

const keysRu = [
  'ё',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  '-',
  '=',
  'Backspace',
  'Tab',
  'й',
  'ц',
  'у',
  'к',
  'е',
  'н',
  'г',
  'ш',
  'щ',
  'з',
  'х',
  'ъ',
  '/',
  'Delete',
  'CapsLock',
  'ф',
  'ы',
  'в',
  'а',
  'п',
  'р',
  'о',
  'л',
  'д',
  'ж',
  'э',
  'Enter',
  'Shift',
  '/',
  'я',
  'ч',
  'с',
  'м',
  'и',
  'т',
  'ь',
  'б',
  'ю',
  '.',
  '↑',
  'Shift',
  'Ctrl',
  'Ru',
  'Alt',
  ' ',
  'Alt',
  'Ctrl',
  '←',
  '↓',
  '→',
];

const container = document.createElement('div');
container.classList.add('container');
document.body.prepend(container);

const textArea = document.createElement('textarea');
textArea.classList.add('textarea');
container.append(textArea);

const keyboardContainer = document.createElement('div');
keyboardContainer.classList.add('keyboard-container');
container.append(keyboardContainer);

const userInfo = document.createElement('div');
userInfo.classList.add('user-info-container');
document.body.append(userInfo);
const userText1 = document.createElement('p');
const userText2 = document.createElement('p');
userText1.classList.add('user-text-1');
userText2.classList.add('user-text-2');
userInfo.append(userText1);
userInfo.append(userText2);

userText1.textContent = 'Создано в Windows';
userText2.textContent = 'Переключение языка: Left Alt + Left Shift';

const row1 = document.createElement('div');
const row2 = document.createElement('div');
const row3 = document.createElement('div');
const row4 = document.createElement('div');
const row5 = document.createElement('div');

const rowArr = [row1, row2, row3, row4, row5];
rowArr.forEach((item) => item.classList.add('row'));
rowArr.forEach((item) => keyboardContainer.append(item));

const keyArr = [];

let capslockSwitch = false;
let shiftSwitch = false;

const createEnKeys = () => {
  for (let i = 0; i < keys.length; i += 1) {
    keyArr[i] = document.createElement('button');
    keyArr[i].classList.add('keyboard-key');
    keyArr[i].textContent = keys[i];
    keyArr[i].style.width = '60px';
  }
  for (let i = 0; i < keyArr.length; i += 1) {
    if (i < 14) row1.append(keyArr[i]);
    if (i >= 14 && i < 29) row2.append(keyArr[i]);
    if (i >= 29 && i < 42) row3.append(keyArr[i]);
    if (i >= 42 && i < 56) row4.append(keyArr[i]);
    if (i >= 56) row5.append(keyArr[i]);
  }

  const backspace = keyArr[13];
  backspace.style.flexBasis = '12%';
  backspace.style.maxWidth = '100%'; // backspace size

  const tab = keyArr[14];
  tab.style.flexBasis = '8%';
  tab.style.maxWidth = '100%'; // tab size

  const capslock = keyArr[29];
  capslock.style.flexBasis = '12%';
  capslock.style.maxWidth = '100%'; // capslock size

  const enter = keyArr[41];
  enter.style.flexBasis = '12%';
  enter.style.maxWidth = '100%'; // enter size

  const leftShift = keyArr[42];
  leftShift.style.flexBasis = '12%';
  leftShift.style.maxWidth = '100%'; // left shift size

  const leftCtrl = keyArr[56];
  leftCtrl.style.flexBasis = '10%';
  leftCtrl.style.maxWidth = '100%'; // left ctrl size

  const space = keyArr[59];
  space.style.flexBasis = '40%';
  space.style.maxWidth = '100%'; // space size

  const rightCtrl = keyArr[61];
  rightCtrl.style.flexBasis = '10%';
  rightCtrl.style.maxWidth = '100%'; // right ctrl size

  keyArr[57].textContent = localStorage.getItem('lang');

  if (keyArr[57].textContent === 'Ru') {
    for (let i = 0; i < keyArr.length; i += 1) {
      keyArr[i].textContent = keysRu[i];
    }
  } else if (keyArr[57].textContent === 'En') {
    for (let i = 0; i < keyArr.length; i += 1) {
      keyArr[i].textContent = keys[i];
    }
  }
};

const altShiftShortcut = {
  count: 0,
  lastbtn: 'none',
};

const pressingKeys = (event) => {
  const currButton = event.target;
  const backspace = keyArr[13];
  const del = keyArr[28];
  const rightShift = keyArr[55];
  const leftAlt = keyArr[58];
  const tab = keyArr[14];
  const capslock = keyArr[29];
  const enter = keyArr[41];
  const leftShift = keyArr[42];
  const langButton = keyArr[57];

  const letters = 'abcdefghijklmnopqrstuvwxyzабвгдеёжзийклмнопрстуфхцчшщъыьэюя';
  const symbols = '`1234567890-=/[];\'/,./';
  const altSymbols = '~!@#$%^&*()_+|{}:"/<>?';
  const symbolsRu = '1234567890-=//.';
  const altSymbolsRu = '!"№;%:?*()_+//?';
  const symbolsKeysArr = [];
  const symbolsKeysArrRu = [];

  for (let i = 0; i < keyArr.length; i += 1) {
    if (keys[i].toLowerCase() === String(event.key).toLowerCase()) {
      keyArr[i].click();
      break;
    } else if (keysRu[i].toLowerCase() === String(event.key).toLowerCase()) {
      keyArr[i].click();
      break;
    }
  }

  if (event.key === 'ArrowUp') {
    keyArr[54].click();
  } else if (event.key === 'ArrowLeft') {
    keyArr[62].click();
  } else if (event.key === 'ArrowDown') {
    keyArr[63].click();
  } else if (event.key === 'ArrowRight') {
    keyArr[64].click();
  }

  if (langButton.textContent === 'En') {
    for (let i = 0; i < keyArr.length; i += 1) {
      if (symbols.includes(keyArr[i].textContent) || altSymbols.includes(keyArr[i].textContent)) {
        symbolsKeysArr.push(keyArr[i]);
      }
    }
  }

  if (langButton.textContent === 'Ru') {
    for (let i = 0; i < keyArr.length; i += 1) {
      if (symbolsRu.includes(keyArr[i].textContent)
|| altSymbolsRu.includes(keyArr[i].textContent)) {
        symbolsKeysArrRu.push(keyArr[i]);
      }
    }
  }

  if (keyArr.includes(event.target) && event.target.textContent.length === 1) {
    if (textArea.selectionStart <= textArea.value.length) {
      const startSelection = textArea.selectionStart;
      const endSelection = textArea.selectionEnd;
      textArea.value = textArea.value.substring(0, startSelection) + event.target.textContent
+ textArea.value.substring(endSelection, textArea.value.length);
      textArea.focus();
      textArea.selectionStart = startSelection + 1;
      textArea.selectionEnd = endSelection + 1;
    } else {
      textArea.value += event.target.textContent;
    }
  }

  if (keyArr.includes(event.target) && event.target === backspace && textArea.selectionStart
!== 0 && textArea.selectionEnd !== 0) {
    const startSelection = textArea.selectionStart;
    const endSelection = textArea.selectionEnd;
    textArea.value = textArea.value.substring(0, startSelection - 1)
+ textArea.value.substring(endSelection, textArea.value.length);
    textArea.focus();
    textArea.selectionStart = startSelection - 1;
    textArea.selectionEnd = endSelection - 1;
  }

  if (keyArr.includes(event.target) && event.target === del && textArea.selectionStart
!== textArea.value.length && textArea.selectionEnd !== textArea.value.length) {
    const startSelection = textArea.selectionStart;
    const endSelection = textArea.selectionEnd;
    textArea.value = textArea.value.substring(0, startSelection)
+ textArea.value.substring(endSelection + 1, textArea.value.length);
    textArea.focus();
    textArea.selectionStart = startSelection;
    textArea.selectionEnd = endSelection;
  }

  if (keyArr.includes(event.target) && event.target === enter) {
    const startSelection = textArea.selectionStart;
    const endSelection = textArea.selectionEnd;
    textArea.value = `${textArea.value.substring(0, startSelection)}\n${textArea.value.substring(endSelection, textArea.value.length)}`;
    textArea.focus();
    textArea.selectionStart = startSelection + 1;
    textArea.selectionEnd = endSelection + 1;
  }

  if (keyArr.includes(event.target) && event.target === tab) {
    const startSelection = textArea.selectionStart;
    const endSelection = textArea.selectionEnd;
    textArea.value = `${textArea.value.substring(0, startSelection)}\t${textArea.value.substring(endSelection, textArea.value.length)}`;
    textArea.focus();
    textArea.selectionStart = startSelection + 1;
    textArea.selectionEnd = endSelection + 1;
  }

  if (keyArr.includes(event.target) && event.target === capslock) {
    if (capslockSwitch === false) {
      capslockSwitch = true;
      for (let i = 0; i < keyArr.length; i += 1) {
        if (letters.includes(keyArr[i].textContent.toLowerCase())) {
          keyArr[i].textContent = keyArr[i].textContent.toUpperCase();
        }
      }
    } else if (capslockSwitch === true) {
      capslockSwitch = false;
      for (let i = 0; i < keyArr.length; i += 1) {
        if (letters.includes(keyArr[i].textContent.toLowerCase())) {
          keyArr[i].textContent = keyArr[i].textContent.toLowerCase();
        }
      }
    }
  }

  if (keyArr.includes(event.target) && leftShift && altShiftShortcut.lastbtn !== 'alt' && langButton.textContent === 'En' && (event.target === leftShift || event.target === rightShift)) {
    if (shiftSwitch === false) {
      shiftSwitch = true;
      for (let i = 0; i < symbolsKeysArr.length; i += 1) {
        symbolsKeysArr[i].textContent = altSymbols[i];
      }
      for (let i = 0; i < keyArr.length; i += 1) {
        if (letters.includes(keyArr[i].textContent.toLowerCase())) {
          keyArr[i].textContent = keyArr[i].textContent.toUpperCase();
        }
      }
    } else if (shiftSwitch === true) {
      shiftSwitch = false;

      for (let i = 0; i < symbolsKeysArr.length; i += 1) {
        symbolsKeysArr[i].textContent = symbols[i];
      }
      for (let i = 0; i < keyArr.length; i += 1) {
        if (letters.includes(keyArr[i].textContent.toLowerCase())) {
          keyArr[i].textContent = keyArr[i].textContent.toLowerCase();
        }
      }
    }
  }

  if (keyArr.includes(event.target) && langButton.textContent === 'Ru' && altShiftShortcut.lastbtn !== 'alt' && (event.target === leftShift || event.target === rightShift)) {
    if (shiftSwitch === false) {
      shiftSwitch = true;
      for (let i = 0; i < symbolsKeysArrRu.length; i += 1) {
        symbolsKeysArrRu[i].textContent = altSymbolsRu[i];
      }
      for (let i = 0; i < keyArr.length; i += 1) {
        if (letters.includes(keyArr[i].textContent.toLowerCase())) {
          keyArr[i].textContent = keyArr[i].textContent.toUpperCase();
        }
      }
    } else if (shiftSwitch === true) {
      shiftSwitch = false;
      for (let i = 0; i < symbolsKeysArrRu.length; i += 1) {
        symbolsKeysArrRu[i].textContent = symbolsRu[i];
      }
      for (let i = 0; i < keyArr.length; i += 1) {
        if (letters.includes(keyArr[i].textContent.toLowerCase())) {
          keyArr[i].textContent = keyArr[i].textContent.toLowerCase();
        }
      }
    }
  }

  if (keyArr.includes(event.target) && event.target === leftShift && (altShiftShortcut.count === 0 || altShiftShortcut.lastbtn === 'alt')) {
    altShiftShortcut.count += 1;
    altShiftShortcut.lastbtn = 'shift';
  }

  if (keyArr.includes(event.target) && event.target === leftAlt && (altShiftShortcut.count === 0 || altShiftShortcut.lastbtn === 'shift')) {
    altShiftShortcut.count += 1;
    altShiftShortcut.lastbtn = 'alt';
  }

  if ((keyArr.includes(event.target) && (altShiftShortcut.count === 2))) {
    if (langButton.textContent === 'En') {
      for (let i = 0; i < keyArr.length; i += 1) {
        keyArr[i].textContent = keysRu[i];
      }
    } else if (langButton.textContent === 'Ru') {
      for (let i = 0; i < keyArr.length; i += 1) {
        keyArr[i].textContent = keys[i];
      }
    }
  }

  if (keyArr.includes(event.target) && event.target !== leftShift && event.target !== leftAlt) {
    altShiftShortcut.count = 0;
    altShiftShortcut.lastbtn = 'none';
  }
  if (keyArr.includes(event.target) && event.target === leftShift && altShiftShortcut.count === 2) {
    altShiftShortcut.count = 0;
    altShiftShortcut.lastbtn = 'none';
  }

  // END-SHIFT
  if (keyArr.includes(event.target) && event.target !== leftShift && event.target !== rightShift && shiftSwitch === true && langButton.textContent === 'En') {
    shiftSwitch = false;
    altShiftShortcut.count = 0;
    altShiftShortcut.lastbtn = 'none';
    for (let i = 0; i < symbolsKeysArr.length; i += 1) {
      symbolsKeysArr[i].textContent = symbols[i];
    }
  }
  if (keyArr.includes(event.target) && shiftSwitch === false && capslockSwitch === false && langButton.textContent === 'En') {
    for (let i = 0; i < keyArr.length; i += 1) {
      if (letters.includes(keyArr[i].textContent.toLowerCase())) {
        keyArr[i].textContent = keyArr[i].textContent.toLowerCase();
      }
    }
  }

  // END-SHIFT-RU
  if (keyArr.includes(event.target) && event.target !== leftShift && event.target !== rightShift && shiftSwitch === true && langButton.textContent === 'Ru') {
    shiftSwitch = false;
    altShiftShortcut.count = 0;
    altShiftShortcut.lastbtn = 'none';
    for (let i = 0; i < symbolsKeysArrRu.length; i += 1) {
      symbolsKeysArrRu[i].textContent = symbolsRu[i];
    }
  }
  if (keyArr.includes(event.target) && shiftSwitch === false && capslockSwitch === false && langButton.textContent === 'Ru') {
    for (let i = 0; i < keyArr.length; i += 1) {
      if (letters.includes(keyArr[i].textContent.toLowerCase())) {
        keyArr[i].textContent = keyArr[i].textContent.toLowerCase();
      }
    }
  }
  localStorage.setItem('lang', keyArr[57].textContent);

  if (keyArr.includes(event.target)) {
    currButton.style.background = 'white';
    setTimeout(() => {
      currButton.style.background = '#f5f5f5';
    }, (0.3 * 1000));
  }
};

const textAreaBlock = (e) => {
  e.preventDefault();
};

keyboardContainer.addEventListener('click', pressingKeys);
document.addEventListener('keydown', pressingKeys);
document.addEventListener('keydown', textAreaBlock);

createEnKeys();
