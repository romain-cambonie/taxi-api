import fastify, {FastifyInstance} from 'fastify'
import postgres from '@fastify/postgres'
import {closeGracefullyOnSignalInterrupt, start} from "./server.utils";
import {FareByDayRequest, FarePg, getFaresByDayPg, toFaresTransfer} from './fares'


const server: FastifyInstance = fastify();

closeGracefullyOnSignalInterrupt({server, process});

server.register(postgres, {
    connectionString: process.env['DATABASE_URL'] ?? ""
})

server.get('/', async (_request, _reply) => {
    return 'OK\n'
})

server.get('/fares/:date', async (req: FareByDayRequest, reply) => {
    const fares: FarePg[] | Error = await getFaresByDayPg(server.pg)(req.params.date);

    fares instanceof Error
        ? reply.send(fares)
        : reply.send(fares.map(toFaresTransfer));
})

start({server, process});