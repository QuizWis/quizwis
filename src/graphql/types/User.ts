import { enumType, extendType, objectType } from 'nexus';

const Role = enumType({
  name: 'Role',
  members: ['USER', 'ADMIN'],
});

// eslint-disable-next-line import/prefer-default-export
export const User = objectType({
  name: 'User',
  definition(t) {
    t.string('id');
    t.string('name');
    t.string('email');
    t.string('image');
    t.field('role', { type: Role });
  },
});

export const LinksQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('users', {
      type: 'User',
      resolve(_parent, _args, ctx) {
        return ctx.prisma.user.findMany();
      },
    });
  },
});
