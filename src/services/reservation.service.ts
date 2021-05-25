import Reservation from '../models/reservation.model.ts';
import { venueService } from './venue.service.ts'

class ReservationService {
    
    async getAll(): Promise<any[]>{
        return await Reservation.all();
    }

    async getAllReservationsForVenue(venueId: string) {
        return (await this.getAll()).filter(x => x.venueId === venueId);
    }

    async getAllReservationsForUser(userId: number) {
        return (await this.getAll()).filter(x => x.userId === userId);
    }

    async getCurrentReservationsForTime(venueId: string, reservationStart: Date, reservationEnd: Date) {
        const reservations = await this.getAll();
        const reservationsForVenue = reservations.filter(x => x.venueId === venueId);
        const reservationsForDates = reservationsForVenue.filter(x => (new Date(x.reservationEnd) <= new Date(reservationEnd) && new Date(x.reservationEnd) > new Date(reservationStart)) 
                                                                    || (new Date(x.reservationStart) >=  new Date(reservationStart) && new Date(x.reservationStart) < new Date(reservationEnd)));

        return reservationsForDates;
    }

    async reservationIsValid(body: any) {
        const overlappingReservations = await this.getCurrentReservationsForTime((await venueService.get(body.venueId))?.id, body.reservationStart, body.reservationEnd);
        const venue = await venueService.get(body.venueId);
        const bookedSpots = overlappingReservations.reduce((acc, val) => {
            return acc += val.spots
        }, 0);

        return venue ? (bookedSpots + body.spots) <= venue?.availableSpots : false;
    }

    // CRUD
    async create(body: any) {
        await Reservation.create(body);

        return this.get(body.uuid); 
    }

    async get(uuid: string) {
        return (await this.getAll()).filter(x => x.uuid === uuid)[0];
    }
}

export const reservationService = new ReservationService();