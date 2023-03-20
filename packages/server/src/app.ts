import { graphqlHTTP, OptionsData } from 'koa-graphql';
import { GraphQLError } from 'graphql';

import Koa, { Request } from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from '@koa/router';
import cors from '@koa/cors';

import { getContext } from './context';
import { getUser } from './auth';
import { schema } from './schema/schema';

const app = new Koa();
const router = new Router();

const graphQLSettingsPerReq = async (req: Request): Promise<OptionsData> => {
  const user = await getUser(req.header.authorization);

  return {
    graphiql: true,
    pretty: true,
    schema,
    context: getContext({ user }),
    customFormatErrorFn: (error: GraphQLError) => {
      return {
        message: error.message,
        locations: error.locations,
        stack: error.stack,
      };
    },
  };
};

const graphQLServer = graphqlHTTP(graphQLSettingsPerReq);

router.all('/graphql', graphQLServer);

app.use(cors({ credentials: true }));
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

export default app;
