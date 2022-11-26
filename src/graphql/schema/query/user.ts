import { arg, nonNull, queryField } from 'nexus';

export const getUser = queryField('user', {
  type: 'User',
  args: {
    userId: nonNull(arg({ type: 'BigInt' })),
  },
  resolve(_parent, { databaseId }, ctx) {
    return ctx.prisma.user.findUnique({ where: { databaseId } });
  },
});
