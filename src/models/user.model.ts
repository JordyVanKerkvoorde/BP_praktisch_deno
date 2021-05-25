import { Model, DataTypes } from "../../depts.ts";
import { Roles } from "../domain/role.enum.ts";
import { HelperFunctions } from '../utils/helper.util.ts';

export default class User extends Model {
    static table = 'users';
    // columnnames wouldnt match :/
    static timestamps = false;

    static fields = {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        uuid: DataTypes.STRING,
        firstName: { type: DataTypes.STRING, as: 'firstName' },
        lastName: { type: DataTypes.STRING, as: 'lastName' },
        dateOfBirth: { type: DataTypes.DATE, as: 'dateOfBirth' },
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        salt: DataTypes.STRING,
        role: { type: DataTypes.ENUM, values: Object.values(Roles) },
        createdAt: { type: DataTypes.DATETIME, as: 'createdAt' },
        updatedAt: { type: DataTypes.DATETIME, as: 'updatedAt' }
    }

    static defaults = {
        createdAt: HelperFunctions.generateNewDateNow(),
        updatedAt: HelperFunctions.generateNewDateNow()
    }
}