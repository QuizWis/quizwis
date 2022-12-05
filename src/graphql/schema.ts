import { join } from 'path';

import { GraphQLBigInt, GraphQLDateTime } from 'graphql-scalars';
import { asNexusMethod, fieldAuthorizePlugin, makeSchema } from 'nexus';

import * as types from './schema/index';

const schema = makeSchema({
  features: {
    abstractTypeStrategies: {
      resolveType: false,
      __typename: true,
    },
  },
  plugins: [
    fieldAuthorizePlugin(),
  ],
  types: [
    types,
    asNexusMethod(GraphQLBigInt, 'bigint', 'bigint'),
    asNexusMethod(GraphQLDateTime, 'datetime', 'Date'),
  ],
  outputs: {
    typegen: join(process.cwd(), 'node_modules', '@types', 'nexus-typegen', 'index.d.ts'),
    schema: join(process.cwd(), 'src', 'graphql', 'generated', 'schema.graphql'),
  },
  contextType: {
    export: 'Context',
    module: join(process.cwd(), 'src', 'graphql', 'context.ts'),
  },
});

export default schema;
