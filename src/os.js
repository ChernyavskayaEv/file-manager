import { EOL, cpus, homedir, userInfo, arch } from 'node:os';

export const osi = async (command) => {
  switch (command) {
    case '--EOL':
      console.log(JSON.stringify(EOL));
      console.log(`You are currently in ${process.cwd()}`);
      break;
    case '--cpus':
      const infoCPU = cpus().map(({ model, speed, _ }) => {
        return {
          model,
          speed,
        };
      });
      const amountCPU = `overall amount of CPUS ${infoCPU.length}`;
      console.log(amountCPU);
      console.log(infoCPU);
      console.log(`You are currently in ${process.cwd()}`);
      break;
    case '--homedir':
      console.log(homedir());
      console.log(`You are currently in ${process.cwd()}`);
      break;
    case '--username':
      console.log(userInfo().username);
      console.log(`You are currently in ${process.cwd()}`);
      break;
    case '--architecture':
      console.log(arch());
      console.log(`You are currently in ${process.cwd()}`);
      break;
    default:
      console.log('Invalid input');
      console.log(`You are currently in ${process.cwd()}`);
      break;
  }
};
