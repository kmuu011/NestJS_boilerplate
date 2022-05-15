const includeDist = __dirname.indexOf('dist');
const dirPath = __dirname.substring(0, includeDist !== -1 ? __dirname.lastIndexOf('dist') : undefined);

global.filePath = dirPath + 'files/';
