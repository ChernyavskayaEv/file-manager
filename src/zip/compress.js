import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliCompress } from 'node:zlib';
import { pipeline } from 'node:stream';

const re2 = /(\S+)(\s+)(\S+)(\s+)(\S+)/;

export const compressed = async (str) => {
  const pathToFail = str.replace(re2, '$3');
  const pathToDestination = str.replace(re2, '$5');

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
