import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream';
import {
  writeFile,
  rename as renameFail,
  access,
  constants,
  unlink,
} from 'node:fs/promises';
import path from 'path';

const re1 = /(\S+)(\s+)(\S+)/;
const re2 = /(\S+)(\s+)(\S+)(\s+)(\S+)/;

export const read = async (str) => {
  const fileName = str.replace(re1, '$3');

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

export const create = async (str) => {
  try {
    const newFileName = str.replace(re1, '$3');

    await writeFile(newFileName, '', { flag: 'wx' });
    console.log(`You are currently in ${process.cwd()}`);
  } catch (err) {
    console.error('Operation failed');
    console.log(`You are currently in ${process.cwd()}`);
  }
};

export const rename = async (str) => {
  const fileName = str.replace(re2, '$3');
  const newFileName = str.replace(re2, '$5');

  const isFile = await access(newFileName, constants.F_OK)
    .then(() => true)
    .catch(() => false);

  try {
    if (!isFile) {
      await renameFail(fileName, newFileName);
      console.log(`You are currently in ${process.cwd()}`);
    } else {
      console.error('Operation failed');
      console.log(`You are currently in ${process.cwd()}`);
    }
  } catch (err) {
    console.error('Operation failed');
    console.log(`You are currently in ${process.cwd()}`);
  }
};

export const copy = async (str) => {
  const fileName = str.replace(re2, '$3');
  const filePath = path.resolve(process.cwd(), fileName);
  const newDirectory = str.replace(re2, '$5');
  const newFilePath = path.resolve(newDirectory, fileName);

  const isFile = await access(filePath, constants.F_OK)
    .then(() => true)
    .catch(() => false);

  const isNewFile = await access(newFilePath, constants.F_OK)
    .then(() => true)
    .catch(() => false);

  if (isFile && !isNewFile) {
    const readable = createReadStream(fileName);

    const writable = createWriteStream(newFilePath);
    return new Promise((resolve) => {
      pipeline(readable, writable, (err) => {
        if (err) {
          console.log(err);
          console.error('Operation failed');
        }
        console.log(`You are currently in ${process.cwd()}`);
        resolve();
      });
    });
  } else {
    console.error('Operation failed');
    console.log(`You are currently in ${process.cwd()}`);
  }
};

export const remove = async (str) => {
  const fileName = str.replace(re1, '$3');
  try {
    await unlink(fileName);
    console.log(`You are currently in ${process.cwd()}`);
  } catch (err) {
    console.error('Operation failed');
    console.log(`You are currently in ${process.cwd()}`);
  }
};

export const move = async (str) => {
  await copy(str);
  const fileName = str.replace(re2, '$3');
  const filePath = path.resolve(process.cwd(), fileName);

  const isFile = await access(filePath, constants.F_OK)
    .then(() => true)
    .catch(() => false);

  if (isFile) unlink(fileName);
};
