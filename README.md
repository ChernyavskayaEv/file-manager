# file-manager

1. Link to the task: [File Manager](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/file-manager/assignment.md)
2. Deadline date: 2023-06-27 07:00 (UTC +07:00)
3. Self-check with a preliminary assessment (330):

#### Basic Scope

- General implemented properly
  - [x] **+6** Application accepts username and prints proper message
  - [x] **+10** Application exits if user pressed `ctrl+c` or sent `.exit` command and proper message is printed
- Operations fail
  - [x] **+20** Attempts to perform an operation on a non-existent file or work on a non-existent path result in the operation fail
  - [x] **+10** Operation fail doesn't crash application
- Navigation & working directory operations implemented properly
  - [x] **+10** Go upper from current directory
  - [x] **+10** Go to dedicated folder from current directory
  - [x] **+20** List all files and folders in current directory
- Basic operations with files implemented properly
  - [x] **+10** Read file and print it's content in console
  - [x] **+10** Create empty file
  - [x] **+10** Rename file
  - [x] **+10** Copy file
  - [x] **+10** Move file
  - [x] **+10** Delete file
- Operating system info (prints following information in console) implemented properly
  - [x] **+6** Get EOL (default system End-Of-Line)
  - [x] **+10** Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them)
  - [x] **+6** Get home directory
  - [x] **+6** Get current system user name (Do not confuse with the username that is set when the application starts)
  - [x] **+6** Get CPU architecture for which Node.js binary has compiled
- Hash calculation implemented properly
  - [x] **+20** Calculate hash for file
- Compress and decompress operations implemented properly
  - [x] **+20** Compress file (using Brotli algorithm)
  - [x] **+20** Decompress file (using Brotli algorithm)

#### Advanced Scope

- [x] **+30** All operations marked as to be implemented using certain streams should be performed using Streams API
- [x] **+20** No synchronous Node.js API with asynchronous analogues is used (e.g. not used `readFileSync` instead of `readFile`)
- [x] **+20** Codebase is written in ESM modules instead of CommonJS
- [x] **+20** Codebase is separated (at least 7 modules)

#### Forfeits

- **-95% of total task score** Any external tools/libraries are used
- **-30% of total task score** Commits after deadline (except commits that affect only `Readme.md`, `.gitignore`, etc.)
