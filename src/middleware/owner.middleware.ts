import { RouterContext } from "../../depts.ts";
import { venueService } from "../services/venue.service.ts";
import { OakUtils } from "../utils/oak.util.ts";

class OwnerMiddleware {
    async authenticate(context: RouterContext, next: any) {
        const user = OakUtils.getUser(context);
        if(context.params && context.params.uuid){
            const venue = await venueService.get(context.params.uuid);
            if(venue?.ownerId === user.id) next();
            else return context.throw(403);
        } else {
            return context.throw(501);
        }
    }
}

export const ownerMiddleware = new OwnerMiddleware();