export const changeDirectory = async (directoryPath) => {
  try {
    process.chdir(directoryPath);
    console.log(`You are currently in ${process.cwd()}`);
  } catch (err) {
    console.error('Operation failed');
    console.log(`You are currently in ${process.cwd()}`);
  }
};
