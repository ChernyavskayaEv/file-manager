const userName = process.argv
  .filter((arg) => arg.startsWith('--username='))
  .toString();

export const greeting = userName
  ? `Welcome to the File Manager, ${userName.slice(11)}!`
  : 'Welcome to the File Manager, Anonymous!';

export const farewell = userName
  ? `Thank you for using File Manager, ${userName.slice(11)}, goodbye! `
  : 'Thank you for using File Manager, Anonymous, goodbye! ';

const re = /('|")/g;

const re11 = /(\S+)(\s+)(?<arg1>\S+)/g; //когда без кавычек
const re12 = /(\S+)(\s+)(('|")(?<arg1>.+)('|"))/g; //когда с кавычками

const re21 = /(\S+)(\s+)(?<arg1>\S+)(\s+)(?<arg2>\S+)/g; //когда оба пути без кавычек
const re22 = /(\S+)(\s+)(('|")(?<arg1>.+)('|"))(\s+)(('|")(?<arg2>.+)('|"))/g; //когда оба пути с кавычками
const re23 = /(\S+)(\s+)(('|")(?<arg1>.+)('|"))(\s+)((?<arg2>.+))/g; //когда первый путь с кавычками
const re24 = /(\S+)(\s+)(?<arg1>\S+)(\s+)(('|")(?<arg2>.+)('|"))/g; //когда второй путь с кавычками

export const onePath = (str) =>
  str.match(re) ? str.replace(re12, '$<arg1>') : str.replace(re11, '$<arg1>');

export const firstPath = (str) => {
  if (!str.match(re)) {
    return str.replace(re21, '$<arg1>');
  } else if (str.match(re).length === 4) {
    return str.replace(re22, '$<arg1>');
  } else if (str.endsWith(`'`) || str.endsWith(`"`)) {
    return str.replace(re24, '$<arg1>');
  } else {
    return str.replace(re23, '$<arg1>');
  }
};

export const secondPath = (str) => {
  if (!str.match(re)) {
    return str.replace(re21, '$<arg2>');
  } else if (str.match(re).length === 4) {
    return str.replace(re22, '$<arg2>');
  } else if (str.endsWith(`'`) || str.endsWith(`"`)) {
    return str.replace(re24, '$<arg2>');
  } else {
    return str.replace(re23, '$<arg2>');
  }
};
