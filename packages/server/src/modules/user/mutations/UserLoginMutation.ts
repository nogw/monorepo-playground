import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { errorField, successField } from '@entria/graphql-mongo-helpers';

import { generateJwtToken } from '../../../auth';

import { UserModel } from '../UserModel';
import UserLoader from '../UserLoader';
import UserType from '../UserType';

export const userLogin = mutationWithClientMutationId({
  name: 'UserLogin',
  inputFields: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async ({ email, password }) => {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return { error: 'This user was not registered' };
    }

    if (!(await user.authenticate(password))) {
      return { error: 'This password is incorrect' };
    }

    const token = generateJwtToken(user);

    return {
      token,
      id: user._id,
      sucess: 'Logged with success',
    };
  },
  outputFields: {
    token: {
      type: GraphQLString,
      resolve: ({ token }) => token,
    },
    me: {
      type: UserType,
      resolve: async ({ id }, _, context) => {
        return await UserLoader.load(context, id);
      },
    },
    ...errorField,
    ...successField,
  },
});
