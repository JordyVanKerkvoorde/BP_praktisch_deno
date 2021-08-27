import { Model, DataTypes, Relationships } from "../../deps.ts";
import User from "./user.model.ts";
import Venue from "./venue.model.ts";
import { HelperFunctions } from '../utils/helper.util.ts';

export default class Reservation extends Model {
    static table = 'reservations';
    // columnnames wouldnt match :/
    static timestamps = false;

    static fields = {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        uuid: DataTypes.STRING,
        spots: DataTypes.INTEGER,
        reservationStart: { type: DataTypes.DATETIME, as: 'reservationStart' },
        reservationEnd: { type: DataTypes.DATETIME, as: 'reservationEnd' },
        venueId: { type: DataTypes.INTEGER, as: 'venueId' },
        userId: { type: DataTypes.INTEGER, as: 'userId' },
        createdAt: { type: DataTypes.DATETIME, as: 'createdAt' },
        updatedAt: { type: DataTypes.DATETIME, as: 'updatedAt' }
    }

    static defaults = {
        createdAt: HelperFunctions.generateNewDateNow(),
        updatedAt: HelperFunctions.generateNewDateNow()
    }

    static venue() {
        return this.hasOne(Venue);
    }

    static user() {
        return this.hasOne(User)
    }
}