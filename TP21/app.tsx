import { Application, config } from "./deps.ts";
import { router } from "./routes/index.ts";

const configData = config()
const PORT = configData['PORT'] || 8080

const app = new Application();
app.use(router.routes())
app.use(router.allowedMethods())

console.log(`Server on port: ${PORT}`)

await app.listen({ port: Number(PORT) })
