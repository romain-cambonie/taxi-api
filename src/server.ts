// TODO This is an insecure http server set to http2 before production !
import fastify, {FastifyInstance, FastifyRequest} from 'fastify'
import postgres from '@fastify/postgres'


type DateRequest = FastifyRequest<{
    Params: {
        date: string,
    };
}>

const server: FastifyInstance = fastify();



const PORT: number = parseInt(process.env['PORT'] ?? "80");
const DATABASE_URL: string = process.env['DATABASE_URL'] ?? "postgres://postgres:plop@localhost/postgres";
const HOST: string =  "0.0.0.0";

server.register(postgres, {
    connectionString: DATABASE_URL
})

server.get('/', async (_request, _reply) => {
    return 'OK\n'
})

server.get('/ping', async (_request, _reply) => {
    return 'pong\n'
})

server.get('/fares/:date', (req: DateRequest, reply) => {
    server.pg.query(
        'SELECT * FROM public.fares_orient WHERE date=$1', [req.params.date],
        function onResult (err, result) {
            reply.send(err || (result.rows ?? []))
        }
    )
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