// TODO This is an insecure http server set to http2 before production !
import fastify, {FastifyInstance, FastifyRequest} from 'fastify'
import postgres, {PostgresDb} from '@fastify/postgres'
import {fareByDayRead, FarePg, toFaresTransfer} from './fares'

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

const getFaresByDayPg = (db: PostgresDb) => async (date: string): Promise<FarePg[] | Error>  => {
    const client = await db.connect();
    try {
        const { rows } = await client.query(
            fareByDayRead, [date]
        )

        return rows ?? [];
    }
    catch (error: unknown) {
        return new Error((error as Error).message);
    } finally {
        client.release()
    }
}

server.get('/fares/:date', async (req: DateRequest, reply) => {
    const fares: FarePg[] | Error = await getFaresByDayPg(server.pg)(req.params.date);

    fares instanceof Error
        ? reply.send(fares)
        : reply.send(fares.map(toFaresTransfer));
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