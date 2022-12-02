import { mutationField, nonNull, arg } from 'nexus';

export const createUser = mutationField('createUser', {
  type: 'User',
  args: {
    databaseId: nonNull(arg({ type: 'String' })),
    name: nonNull(arg({ type: 'String' })),
    email: nonNull(arg({ type: 'String' })),
  },
  resolve(_parent, { databaseId, name, email }, ctx) {
    return ctx.prisma.user.create({ data: { databaseId, name, email } });
  },
});

export const updateUser = mutationField('updateUser', {
  type: 'User',
  args: {
    databaseId: nonNull(arg({ type: 'String' })),
    name: arg({ type: 'String' }),
    email: arg({ type: 'String' }),
  },
  resolve(_parent, { databaseId, name, email }, ctx) {
    return ctx.prisma.user.update({
      where: { databaseId },
      data: { name: name ?? undefined, email: email ?? undefined },
    });
  },
});
