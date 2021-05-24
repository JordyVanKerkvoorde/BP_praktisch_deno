import Venue from '../models/venue.model.ts'

class VenueServive {

    async getAll(): Promise<Venue[]> {
        return await Venue.all();
    }

    // CRUD
    async create(body: any) {
        await Venue.create(body);

        return this.get(body.uuid); 
    }

    async get(uuid: string) {
        return (await this.getAll()).filter(x => x.uuid === uuid)[0];
    }

    update(uuid: string, venueData: any): Promise<Venue | Venue[]> {
        return Venue.where('uuid', uuid).update(venueData);
    }

    delete(uuid: string): Promise<Venue | Venue[]> {
        return Venue.where('uuid', uuid).delete();
    }
}

export const venueService = new VenueServive();