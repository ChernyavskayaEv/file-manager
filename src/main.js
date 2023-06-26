import process from 'process';

import { greeting, farewell, onePath } from './constants.js';
import { changeDirectory } from './nwd/changeDirectory.js';
import { folderContents } from './nwd/folderContents.js';
import { copy, move, remove } from './bo/bowf.js';
import { read } from './bo/read.js';
import { create } from './bo/create.js';
import { rename } from './bo/rename.js';
import { osi } from './os/os.js';
import { calculateHash } from './hash/calcHash.js';
import { compressed } from './zip/compress.js';
import { decompressed } from './zip/decompress.js';

process.on('SIGINT', () => {
  console.log(`\n${farewell}\n`);
  process.exit(0);
});

const readable = process.stdin;

console.log(`${greeting}\n\nYou are currently in ${process.cwd()}\n`);

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
      const directoryPath = onePath(chunkStringified);
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
      const secondaryCommand = onePath(chunkStringified);
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
