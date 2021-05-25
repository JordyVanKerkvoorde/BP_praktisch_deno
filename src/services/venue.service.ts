import Venue from '../models/venue.model.ts'

class VenueServive {

    async getAll(): Promise<any[]> {
        return await Venue.all();
    }

    // CRUD
    async create(body: any) {
        await Venue.create(body);

        return this.get(body.uuid); 
    }

    async get(uuid: string) : Promise<any>{
        return (await this.getAll()).filter(x => x.uuid === uuid)[0];
    }

    update(uuid: string, venueData: any): Promise<any> {
        return Venue.where('uuid', uuid).update(venueData);
    }

    delete(uuid: string): Promise<any> {
        return Venue.where('uuid', uuid).delete();
    }
}

export const venueService = new VenueServive();