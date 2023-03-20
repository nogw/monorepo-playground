import { fromGlobalId, nodeDefinitions } from 'graphql-relay';
import { GraphQLObjectType, GraphQLTypeResolver } from 'graphql';

import { GraphQLContext } from '../../graphql/types';

type Load = (context: GraphQLContext, id: string) => any;

type TypeLoaders = {
  [key: string]: {
    type: GraphQLObjectType;
    load: Load;
  };
};

const getTypeRegister = () => {
  const typesLoaders: TypeLoaders = {};

  const fetchById = (globalId: string, context: GraphQLContext) => {
    const { type, id } = fromGlobalId(globalId);
    const { load } = typesLoaders[type] || { load: null };

    return (load && load(context, id)) || null;
  };

  const typeResolver = <T>(obj: GraphQLTypeResolver<any, T>) => {
    const { type } = typesLoaders[obj.constructor.name] || { type: null };

    return type.name;
  };

  const { nodeField, nodesField, nodeInterface } = nodeDefinitions(fetchById, typeResolver);

  const getTypesLoaders = () => typesLoaders;

  const registerTypeLoader = (type: GraphQLObjectType, load: Load) => {
    typesLoaders[type.name] = {
      type,
      load,
    };

    return type;
  };

  return {
    nodeField,
    nodesField,
    nodeInterface,
    getTypesLoaders,
    registerTypeLoader,
  };
};

export const { nodeField, nodesField, nodeInterface, getTypesLoaders, registerTypeLoader } = getTypeRegister();
