import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const re1 = /(\S+)(\s+)(\S+)/;

export const calculateHash = async (str) => {
  try {
    const fileName = str.replace(re1, '$3');

    const contents = await readFile(fileName, { encoding: 'utf8' });
    console.log(contents);
    const hash = createHash('SHA256').update(contents).digest('hex');

    console.log(hash);
    console.log(`You are currently in ${process.cwd()}`);
  } catch (err) {
    console.error('Operation failed');
    console.log(`You are currently in ${process.cwd()}`);
  }
};
