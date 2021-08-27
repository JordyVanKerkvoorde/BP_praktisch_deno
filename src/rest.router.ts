import { Router } from '../deps.ts';
import { reservationController } from "./controllers/reservation.controller.ts";
import { userController } from './controllers/user.controller.ts';
import { venueController } from "./controllers/venue.controller.ts";
import { authMiddleware } from './middleware/auth.middleware.ts';
import { ownerMiddleware } from './middleware/owner.middleware.ts';
import { roleMiddleware } from './middleware/role.middleware.ts';
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
        
         // venue
         .get('/venues', authMiddleware.authenticate, venueController.getAll)
         .get('/venues/:uuid', authMiddleware.authenticate, venueController.get)
         .post('/venues', authMiddleware.authenticate, roleMiddleware.owner, venueController.create)
         .put('/venues/:uuid', authMiddleware.authenticate, roleMiddleware.owner, venueController.update)
         .delete('/venues/:uuid', authMiddleware.authenticate, roleMiddleware.owner, venueController.delete)
 
         // reservation
         .get('/reservations', authMiddleware.authenticate, ownerMiddleware.authenticate, reservationController.get)
         .post('/reservations', authMiddleware.authenticate, reservationController.create)
         .put('/reservations/:uuid', authMiddleware.authenticate, reservationController.update)
         .delete('/reservations/:uuid', authMiddleware.authenticate, reservationController.delete)

        return router;
    }
}

export const restRouter = new RestRouter();