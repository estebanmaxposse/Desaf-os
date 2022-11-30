import parseArgs from 'minimist';

const argsOptions = { default: { port: 8080 } }
const args = parseArgs(process.argv.slice(2), argsOptions)
const path = parseArgs(process.argv)
// console.log(args);

const processInfo = {
    args: args,
    port: args.port,
    os: process.platform,
    nodeVer: process.version,
    memory: process.memoryUsage(),
    folder: process.cwd(),
    id: process.pid,
    path: path._[1]
}

// console.log(processInfo);

export default processInfo