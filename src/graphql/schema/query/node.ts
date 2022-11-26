import { queryField, nonNull, stringArg } from 'nexus';

export const node = queryField('node', {
  type: 'Node',
  args: {
    id: nonNull(stringArg()),
  },
  resolve: (_parent, { id }, ctx) => {
    const idStr = Buffer.from(id, 'base64').toString();
    const [type, databaseId] = idStr.split(':');
    if (type === 'User') {
      const res = ctx.prisma.user.findUnique({ where: { id: databaseId } });
      return res ? { ...res, __typename: 'User' as const } : null;
    }
    return null;
  },
});
