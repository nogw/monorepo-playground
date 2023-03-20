import { connectionDefinitions, timestampResolver, objectIdResolver } from '@entria/graphql-mongo-helpers';
import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { registerTypeLoader, nodeInterface } from '../node/typeRegister';
import { GraphQLContext } from '../../graphql/types';

import { IUserDocument } from './UserModel';
import { load } from './UserLoader';

const UserType = new GraphQLObjectType<IUserDocument, GraphQLContext>({
  name: 'User',
  description: 'User data',
  fields: () => ({
    id: globalIdField('User'),
    email: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: user => user.email,
    },
    username: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: user => user.username,
    },
    ...objectIdResolver,
    ...timestampResolver,
  }),
  interfaces: () => [nodeInterface],
});

registerTypeLoader(UserType, load);

export default UserType;

export const UserConnection = connectionDefinitions({
  name: 'UserConnection',
  nodeType: UserType,
});
