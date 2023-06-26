import { createReadStream } from 'node:fs';

import { onePath } from '../constants.js';

export const read = async (str) => {
  const fileName = onePath(str);

  const readable = createReadStream(fileName);

  readable.on('data', (chunk) => {
    console.log(chunk + '');
  });

  readable.on('error', () => {
    console.error('Operation failed');
    console.log(`You are currently in ${process.cwd()}`);
  });

  readable.on('end', () => {
    console.log(`\nYou are currently in ${process.cwd()}`);
  });
};
