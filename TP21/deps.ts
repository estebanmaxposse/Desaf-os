export { Application, Router, Context, helpers } from "https://deno.land/x/oak/mod.ts";
export { config } from 'https://deno.land/x/dotenv/mod.ts'
export { join } from "https://deno.land/std@0.177.0/path/mod.ts"
import makeloc from 'https://x.nest.land/dirname@1.1.2/mod.ts'

const { __dirname,  __filename } = makeloc(import.meta)

export {__dirname, __filename}