import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream';
import { access, constants, unlink } from 'node:fs/promises';
import path from 'path';

import { onePath, firstPath, secondPath } from '../constants.js';

export const copy = async (str) => {
  const fileName = firstPath(str);
  const filePath = path.resolve(process.cwd(), fileName);
  const newDirectory = secondPath(str);
  const newFilePath = path.resolve(
    process.cwd(),
    newDirectory,
    path.basename(filePath)
  );

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
  const fileName = onePath(str);
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
  const fileName = firstPath(str);
  const filePath = path.resolve(process.cwd(), fileName);

  const isFile = await access(filePath, constants.F_OK)
    .then(() => true)
    .catch(() => false);

  if (isFile) unlink(fileName);
};
