import { Request } from 'koa';

import { Maybe } from '@fp/types';

import { getDataloaders } from './modules/loader/loaderRegister';
import { GraphQLContext } from './graphql/types';
import { IUserDocument } from './modules/user/UserModel';

type ContextVariables = {
  user?: Maybe<IUserDocument>;
  req?: Request;
};

export const getContext = (context?: ContextVariables): GraphQLContext => {
  const dataloaders = getDataloaders();

  return {
    dataloaders,
    user: context?.user,
  };
};
