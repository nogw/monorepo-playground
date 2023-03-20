import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { errorField, successField } from '@entria/graphql-mongo-helpers';

import { validateSchema, registerSchema } from '../../../validation/validateSchema';
import { generateJwtToken } from '../../../auth';

import { UserModel } from '../UserModel';
import UserLoader from '../UserLoader';
import UserType from '../UserType';

export const userRegister = mutationWithClientMutationId({
  name: 'UserRegister',
  inputFields: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async ({ email, username, password }) => {
    const { error } = validateSchema(registerSchema, { email, username, password });

    if (error) {
      return { error };
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return { error: 'This email is already used' };
    }

    const usedUsername = await UserModel.findOne({ username });

    if (usedUsername) {
      return { error: 'This username is already used' };
    }

    const user = await new UserModel({
      email,
      username,
      password,
    }).save();

    const token = generateJwtToken(user);

    return {
      token,
      id: user._id,
      success: 'User registered with success',
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
