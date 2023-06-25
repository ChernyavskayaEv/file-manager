import { readdir, stat } from 'node:fs/promises';
import path from 'path';

export const changeDirectory = async (directoryPath) => {
  try {
    process.chdir(directoryPath);
    console.log(`You are currently in ${process.cwd()}`);
  } catch (err) {
    console.error('Operation failed');
    console.log(`You are currently in ${process.cwd()}`);
  }
};

export const folderContents = async () => {
  const pathToWorkingDirectory = process.cwd();

  const names = await readdir(pathToWorkingDirectory);

  const types = await Promise.all(
    names.map(async (content) => {
      const contentPath = path.resolve(pathToWorkingDirectory, content);
      return stat(contentPath)
        .then((stats) => {
          if (stats.isDirectory()) {
            return 'directory';
          } else if (stats.isFile()) {
            return 'file';
          }
        })
        .catch((_) => {});
    })
  );

  const contents = names.map((content, index) => {
    return {
      Name: content,
      Type: types[index],
    };
  });

  const typeOrder = ['directory', 'file'];

  let contentSorting = [];

  typeOrder.forEach((item) => {
    const typeSorting = contents
      .filter((a) => a['Type'] === item)
      .sort((a, b) => a.Name - b.Name);

    if (Array.isArray(typeSorting)) {
      contentSorting = [...contentSorting, ...typeSorting];
    }
  });

  console.table(contentSorting);
  console.log(`You are currently in ${process.cwd()}`);
};
