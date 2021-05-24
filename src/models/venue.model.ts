import { Model, DataTypes } from "../../depts.ts";

export default class Venue extends Model {
    static table = 'venues';
    // columnnames wouldnt match :/
    static timestamps = false;

    static fields = {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        uuid: DataTypes.STRING,
        name: DataTypes.STRING,
        logitude: DataTypes.FLOAT,
        latitude: DataTypes.FLOAT,
        address: DataTypes.STRING,
        availableSpots: DataTypes.INTEGER,
        // ownerId: DataTypes.INTEGER
    }
}