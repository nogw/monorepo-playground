import { GraphQLObjectType } from 'graphql';

import * as UserMutation from '../modules/user/mutations';

export const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root of all mutations',
  fields: () => ({
    ...UserMutation,
  }),
});
