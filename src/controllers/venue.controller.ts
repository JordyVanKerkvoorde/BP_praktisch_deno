import { RouterContext } from "../../depts.ts";
import { venueService } from "../services/venue.service.ts";
import { OakUtils } from "../utils/oak.util.ts";
import { v4 as uuidv4 } from '../../depts.ts';

class VenueController {
    async getAll(context: RouterContext) {
        try {
            const venues = await venueService.getAll();

            context.response.body = venues;
        } catch(err) {
            console.error(err);
            context.throw(500);
        }
    }

    // CRUD
    async create (context: RouterContext) {
        try {
            let body = await OakUtils.requestBody(context);
            body.uuid = uuidv4.generate();
            body.ownerId = OakUtils.getUser(context).id;

            const venue = await venueService.create(body)

            context.response.body = venue;
        } catch(err) {
            console.error(err);
            context.throw(500);
        }
    }

    async get(context: RouterContext) {
        try {
            let venue = null;
            if (context.params && context.params.uuid) {
                venue = await venueService.get(context.params.uuid);
            }

            context.response.body = venue;
        } catch(err) {
            console.error(err);
            context.throw(500);
        }
    }

    async update(context: RouterContext) {
        try {
            let venue = null;
            if (context.params && context.params.uuid) {
                venue = await venueService.update(context.params.uuid, await OakUtils.requestBody(context));
            }

            context.response.body = venue;
        } catch(err) {
            console.error(err);
            context.throw(500);
        }
    }

    async delete(context: RouterContext) {
        try {
            let response = null;

            if (context.params && context.params.uuid) {
                response = await venueService.delete(context.params.uuid);
            }

            context.response.body = response;
        } catch(err) {
            console.error(err);
            context.throw(500);
        }
    }
}

export const venueController = new VenueController();