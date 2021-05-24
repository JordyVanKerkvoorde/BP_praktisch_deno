import { Model, DataTypes, Relationships } from "../../depts.ts";
import User from "./user.model.ts";
import Venue from "./venue.model.ts";

export default class Reservation extends Model {
    static table = 'reservations';
    // columnnames wouldnt match :/
    static timestamps = false;

    static fields = {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        uuid: DataTypes.STRING,
        spots: DataTypes.INTEGER,
        reservationStart: DataTypes.DATETIME,
        reservationEnd: DataTypes.DATETIME,
        // venueId: DataTypes.INTEGER,
        // userId: DataTypes.INTEGER
    }

    static venue() {
        return this.hasOne(Venue);
    }

    static user() {
        return this.hasOne(User)
    }
}