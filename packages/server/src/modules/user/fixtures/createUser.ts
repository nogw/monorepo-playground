import { DeepPartial } from '@fp/types';

import { IUserDocument, UserModel } from '../UserModel';
import { getCounter } from '../../../../test';

export const createUser = (args: DeepPartial<IUserDocument> = {}) => {
  const { email, username, password, ...payload } = args;

  const i = getCounter('User');

  return new UserModel({
    email: email || `user${i}@fp.com`,
    username: username || `user#${i}`,
    password: password || `fppassword#${i}`,
    ...payload,
  }).save();
};
