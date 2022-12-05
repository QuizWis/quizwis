import { arg, nonNull, queryField } from 'nexus';

export const getUser = queryField('user', {
  type: 'User',
  args: {
    databaseId: nonNull(arg({ type: 'String' })),
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  authorize: (_root, _args, _ctx) => (true),
  resolve(_parent, { databaseId }, ctx) {
    return ctx.prisma.user.findUnique({ where: { databaseId } });
  },
});
