import process from 'process';
import { changeDirectory, folderContents } from './nwd.js';

process.on('SIGINT', () => {
  console.log(`\n${farewell}\n`);
  process.exit(0);
});

const readable = process.stdin;
const writable = process.stdout;

const location = `You are currently in ${process.cwd()}`;

const userName = process.argv
  .filter((arg) => arg.startsWith('--username='))
  .toString();

const greeting = userName
  ? `Welcome to the File Manager, ${userName.slice(11)}!`
  : 'Welcome to the File Manager, Anonymous!';

const farewell = userName
  ? `Thank you for using File Manager, ${userName.slice(11)}, goodbye! `
  : 'Thank you for using File Manager, Anonymous, goodbye! ';

console.log(`${greeting}\n\n${location}\n`);

readable.on('data', (chunk) => {
  const chunkStringified = chunk.toString().trim();
  const command = chunkStringified.split(' ')[0];
  switch (command) {
    case '.exit':
      console.log(`${farewell}\n`);
      process.exit(0);
    case 'up':
      changeDirectory('..');
      break;
    case 'cd':
      const directoryPath = chunkStringified.slice(3);
      changeDirectory(directoryPath);
      break;
    case 'ls':
      folderContents();
      break;
    default:
      console.log('Invalid input');
      break;
  }
});
