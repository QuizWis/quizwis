import { mutationField, nonNull, arg } from 'nexus';

export const createUser = mutationField('createUser', {
  type: 'User',
  args: {
    name: nonNull(arg({ type: 'String' })),
    email: nonNull(arg({ type: 'String' })),
  },
  resolve(_parent, { name, email }, ctx) {
    return ctx.prisma.user.create({ data: { name, email } });
  },
});

export const updateUser = mutationField('updateUser', {
  type: 'User',
  args: {
    databaseId: nonNull(arg({ type: 'BigInt' })),
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
