import parseArgs from 'minimist';
import CPU from 'os'

const argsOptions = { default: { port: 8080, serverMode: 'fork' } }
const args = parseArgs(process.argv.slice(2), argsOptions)
const path = parseArgs(process.argv)
// console.log(args);

const numCPUs = CPU.cpus().length

const processInfo = {
    args: args,
    port: args.port,
    serverMode: args.serverMode,
    os: process.platform,
    nodeVer: process.version,
    memory: process.memoryUsage(),
    folder: process.cwd(),
    id: process.pid,
    path: path._[1],
    CPUs: numCPUs
}

// console.log(processInfo);

export default processInfo