import { Model, DataTypes } from "../../deps.ts";
import { HelperFunctions } from '../utils/helper.util.ts';


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
        availableSpots: { type: DataTypes.INTEGER, as: 'availableSpots' },
        ownerId: { type: DataTypes.INTEGER, as: 'ownerId' },
        createdAt: { type: DataTypes.DATETIME, as: 'createdAt' },
        updatedAt: { type: DataTypes.DATETIME, as: 'updatedAt' }
    }

    static defaults = {
        createdAt: HelperFunctions.generateNewDateNow(),
        updatedAt: HelperFunctions.generateNewDateNow()
    }
}