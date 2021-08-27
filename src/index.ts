import { databaseService } from './database/database.service.ts';
import { restRouter } from './rest.router.ts';
import { Application, Router } from '../deps.ts'
import config from './config.ts';

await databaseService.connect();

const app = new Application();

app.use(restRouter.router().routes());
// app.use(restRouter.router().allowedMethods());
// app.use((ctx) => {
//     ctx.response.body = 'hello world'
// });

await app.listen({port: config.api.port})