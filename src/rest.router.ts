import { Router } from '../depts.ts';
import { userController } from './controllers/user.controller.ts';
import { authMiddleware } from './middleware/auth.middleware.ts';
import { OakUtils } from "./utils/oak.util.ts";

class RestRouter {
    public router() {
        // const router = new Router();

        // // user routes
        // router.post('/register', (context) => userController.register(context));

        // // venue routes

        // // reservation routes

        
        const router = new Router();
        router
        .get('/', authMiddleware.authenticate, (context) => {
            console.log('HOME')
            context.response.body = OakUtils.getUser(context);
        })
        
        // user
        .post('/register', userController.register)
        .post('/login', userController.login)
        .get('/me', authMiddleware.authenticate, userController.me)
        


        return router;
    }
}

export const restRouter = new RestRouter();