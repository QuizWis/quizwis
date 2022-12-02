import { queryField, nonNull, stringArg } from 'nexus';

export const node = queryField('node', {
  type: 'Node',
  args: {
    id: nonNull(stringArg()),
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  authorize: (_root, _args, _ctx) => true,
  resolve: (_parent, { id }, ctx) => {
    const idStr = Buffer.from(id, 'base64').toString();
    const [type, databaseId] = idStr.split(':');
    if (type === 'User') {
      const res = ctx.prisma.user.findUnique({ where: { databaseId: Number(databaseId) } });
      return res ? { ...res, __typename: 'User' as const } : null;
    }
    return null;
  },
});
