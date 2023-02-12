// TODO This is an insecure http server set to http2 before production !
import fastify, {FastifyInstance} from 'fastify'

const server: FastifyInstance = fastify();
const PORT: number = 443;
const HOST: string =  "localhost";

server.get('/', async (_request, _reply) => {
    return 'OK\n'
})

server.get('/ping', async (_request, _reply) => {
    return 'pong\n'
})

server.get('/delayed', async (_request, _reply) => {
    const SECONDS_DELAY = 20000;
    await new Promise<void>(resolve => {
        setTimeout(() => resolve(), SECONDS_DELAY)
    })
    return { hello: 'delayed world' }
})

async function closeGracefully(signal: string | number | undefined) {
    console.log(`*^!@4=> Received signal to terminate: ${signal}`)

    await server.close()
    // await db.close() if we have a db connection in this app
    // await other things we should cleanup nicely
    process.kill(process.pid, signal);
}

process.once('SIGINT', closeGracefully)
process.once('SIGTERM', closeGracefully)

const start = async () => {
    try {
        await server.listen({ port: PORT, host: HOST }, (err, address) => {
            if (err) {
                console.error(err)
                process.exit(1)
            }
            console.log(`Server listening at ${address}`)
        });
        console.log(`*^!@4=> Process id: ${process.pid}`)
    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}

start();