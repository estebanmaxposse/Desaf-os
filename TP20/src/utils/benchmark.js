import autocannon from "autocannon";
import {PassThrough} from 'stream';
import { errorLog, log } from "../utils/logger.js";

const run = (url) => {
    const buf =[]
    const outputStream = new PassThrough()

    const inst = autocannon({
        url,
        connections: 100,
        duration: 20
    })

    autocannon.track(inst, { outputStream })

    outputStream.on('data', data => buf.push(data))
    inst.on('done', () => {
        process.stdout.write(Buffer.concat(buf))
    })
}

log('Running all benchmarks in parallel... ');

run("http://localhost:8080/info")