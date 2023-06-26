import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

import { onePath } from '../constants.js';

export const calculateHash = async (str) => {
  try {
    const fileName = onePath(str);

    const contents = await readFile(fileName, { encoding: 'utf8' });
    const hash = createHash('SHA256').update(contents).digest('hex');

    console.log(hash);
    console.log(`You are currently in ${process.cwd()}`);
  } catch (err) {
    console.error('Operation failed');
    console.log(`You are currently in ${process.cwd()}`);
  }
};
