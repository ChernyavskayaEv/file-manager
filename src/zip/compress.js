import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliCompress } from 'node:zlib';
import { pipeline } from 'node:stream';

import { firstPath, secondPath } from '../constants.js';

export const compressed = async (str) => {
  const pathToFail = firstPath(str);
  const pathToDestination = secondPath(str);

  const source = createReadStream(pathToFail);

  const gzip = createBrotliCompress();
  const destination = createWriteStream(pathToDestination);

  pipeline(source, gzip, destination, (err) => {
    if (err) {
      console.error('Operation failed');
    }
    console.log(`You are currently in ${process.cwd()}`);
  });
};
