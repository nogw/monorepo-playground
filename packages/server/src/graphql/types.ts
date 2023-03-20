import { Maybe } from '@fp/types';

import { DataLoaders } from '../modules/loader/loaderRegister';
import { IUserDocument } from '../modules/user/UserModel';

export type GraphQLContext = {
  dataloaders: DataLoaders;
  user?: Maybe<IUserDocument>;
};
