import { objectType } from 'nexus';
import { User } from 'nexus-prisma';

import { node } from '../interface/node';

/**
 * ユーザー型の定義
 */
export const user = objectType({
  name: 'User',
  definition(t) {
    t.implements(node);
    t.field(User.databaseId);
    t.field(User.email);
    t.field(User.name);
    t.field(User.createdAt);
    t.field(User.updatedAt);

    t.nonNull.id('id', {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      resolve: (parent, _args, _ctx) => Buffer.from(`User:${parent.databaseId}`).toString('base64'),
    });
  },
});
