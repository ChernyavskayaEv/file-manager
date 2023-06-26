import { writeFile } from 'node:fs/promises';

import { onePath } from '../constants.js';

export const create = async (str) => {
  try {
    const newFileName = onePath(str);

    await writeFile(newFileName, '', { flag: 'wx' });
    console.log(`You are currently in ${process.cwd()}`);
  } catch (err) {
    console.error('Operation failed');
    console.log(`You are currently in ${process.cwd()}`);
  }
};
