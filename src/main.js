import process from 'process';
import { changeDirectory, folderContents } from './nwd.js';
import { read, create, rename, copy, move, remove } from './bowf.js';
import { osi } from './os.js';
import { calculateHash } from './calcHash.js';
import { compressed } from './zip/compress.js';
import { decompressed } from './zip/decompress.js';

process.on('SIGINT', () => {
  console.log(`\n${farewell}\n`);
  process.exit(0);
});

const readable = process.stdin;

const userName = process.argv
  .filter((arg) => arg.startsWith('--username='))
  .toString();

const greeting = userName
  ? `Welcome to the File Manager, ${userName.slice(11)}!`
  : 'Welcome to the File Manager, Anonymous!';

const farewell = userName
  ? `Thank you for using File Manager, ${userName.slice(11)}, goodbye! `
  : 'Thank you for using File Manager, Anonymous, goodbye! ';

console.log(`${greeting}\n\nYou are currently in ${process.cwd()}\n`);

const re1 = /(\S+)(\s+)(\S+)/;

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
      const directoryPath = chunkStringified.replace(re1, '$3');
      changeDirectory(directoryPath);
      break;
    case 'ls':
      folderContents();
      break;
    case 'cat':
      read(chunkStringified);
      break;
    case 'add':
      create(chunkStringified);
      break;
    case 'rn':
      rename(chunkStringified);
      break;
    case 'cp':
      copy(chunkStringified);
      break;
    case 'mv':
      move(chunkStringified);
      break;
    case 'rm':
      remove(chunkStringified);
      break;
    case 'os':
      const secondaryCommand = chunkStringified.replace(re1, '$3');
      osi(secondaryCommand);
      break;
    case 'hash':
      calculateHash(chunkStringified);
      break;
    case 'compress':
      compressed(chunkStringified);
      break;
    case 'decompress':
      decompressed(chunkStringified);
      break;
    default:
      console.log('Invalid input');
      console.log(`You are currently in ${process.cwd()}`);
      break;
  }
});
