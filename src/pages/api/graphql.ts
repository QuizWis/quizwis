import { ServerResponse } from 'http';

import { ApolloServer } from 'apollo-server-micro';
import { MicroRequest } from 'apollo-server-micro/dist/types';
import Cors from 'micro-cors';

import { createContext } from '../../graphql/context';
import { resolvers } from '../../graphql/resolvers';
import schema from '../../graphql/schema';

const cors = Cors();

const apolloServer = new ApolloServer({ schema, resolvers, context: createContext });

const startServer = apolloServer.start();

export default cors(async (req: MicroRequest, res: ServerResponse) => {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }
  await startServer;

  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
