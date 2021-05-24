import { Model, DataTypes } from "../../depts.ts";
import { Roles } from "../domain/role.enum.ts";

export default class User extends Model {
    static table = 'users';
    // columnnames wouldnt match :/
    static timestamps = false;

    static fields = {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        uuid: DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        dateOfBirth: DataTypes.DATE,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        salt: DataTypes.STRING,
        role: { type: DataTypes.ENUM, values: Object.values(Roles) }
    }
}