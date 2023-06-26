import { rename as renameFail, access, constants } from 'node:fs/promises';
import path from 'path';

import { firstPath, secondPath } from '../constants.js';

export const rename = async (str) => {
  const fileName = firstPath(str);
  const newFileName = secondPath(str);

  const pathFile = path.resolve(fileName, '..');
  const pathNewFile = path.resolve(newFileName, '..');

  const pathNewFileName =
    pathFile !== pathNewFile
      ? path.resolve(pathFile, path.basename(newFileName))
      : newFileName;

  const isFile = await access(pathNewFileName, constants.F_OK)
    .then(() => true)
    .catch(() => false);

  try {
    if (!isFile) {
      await renameFail(fileName, pathNewFileName);
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
