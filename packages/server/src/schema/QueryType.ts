import { GraphQLObjectType } from 'graphql';

import { nodeField, nodesField } from '../modules/node/typeRegister';
import UserLoader from '../modules/user/UserLoader';
import UserType from '../modules/user/UserType';

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root of all queries',
  fields: () => ({
    nodes: nodesField,
    node: nodeField,
    me: {
      type: UserType,
      resolve: (_root, _args, context) => {
        return UserLoader.load(context, context.user?.id);
      },
    },
  }),
});
