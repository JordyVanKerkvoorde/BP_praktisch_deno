import { RouterContext } from "../../deps.ts";
import { OakUtils } from "../utils/oak.util.ts";
import { reservationService } from '../services/reservation.service.ts';
import { venueService } from '../services/venue.service.ts';
import { v4 as uuidv4 } from '../../deps.ts';

class ReservationController {
    // CRUD
    async create(context: RouterContext) {
        try {
            const user = OakUtils.getUser(context);
            let body = await OakUtils.requestBody(context);
            body.userId = user.id;
            
            if(await reservationService.reservationIsValid(body)) {
                body.uuid = uuidv4.generate();
                body.venueId = (await venueService.get(body.venueId))?.id;
                const reservation = await reservationService.create(body);
    
                context.response.body = reservation;
                return;
            }
            
            context.throw(500);
        } catch(err) {
            console.error(err);
            context.throw(500);
        }
    }

    async get(context: RouterContext) {
        try {
        
        } catch(err) {
            console.error(err);
            context.throw(500);
        }
    }

    async update(context: RouterContext) {
        try {
        
        } catch(err) {
            console.error(err);
            context.throw(500);
        }
    }

    async delete(context: RouterContext) {
        try {
        
        } catch(err) {
            console.error(err);
            context.throw(500);
        }
    }
}

export const reservationController = new ReservationController();