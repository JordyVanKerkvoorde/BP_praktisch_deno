import { createHash } from "../../deps.ts";
import { HelperFunctions } from '../utils/helper.util.ts';
import { v4 as uuidv4 } from '../../deps.ts';
import { create } from '../../deps.ts';
import User from "../models/user.model.ts";
import config from '../config.ts';

class UserService {
    
    async register(data: any) {
        const hash = this.encryptPassword(data.password);
        data.password = hash.password;
        data.salt = hash.salt;
        // temp
        data.dateOfBirth = new Date().toISOString().split('T')[0];
        data.uuid = uuidv4.generate();
        
        // create user
        if(!await this.getUserByEmail(data.email)) await User.create(data);
        
        return this.getByUuid(data.uuid);
    }

    encryptPassword(password: string) {
        const salt = HelperFunctions.generateRandomString(16);
        
        return this.hashPassword(password, salt);
    }

    hashPassword(password: string, salt: string) {
        const hash = createHash('sha512').update(salt);
        password = hash.update(password).toString();
        
        return {
            password,
            salt
        }
    }

    checkPassword(password: string, hash: string, salt: string) {
        return this.hashPassword(password, salt).password === hash;
    }

    async getUserByEmail(email: string): Promise<any> {
        // find user
        const users = await User.all();

        return users.filter(x => x.email === email)[0];
    }

    async login(data: any) {
        // jwt signing
        try {
            const user = await this.getUserByEmail(data.email);
            
            if(!user) throw Error(`User not found with email: ${data.email}`);
            if(!this.checkPassword(data.password, user.password, user.salt)) throw Error('Password incorrect');

            const token = await create({ alg: "HS512", typ: "JWT" }, user, config.jwt.secret)

            return token;
        } catch(err) {
            console.error(err)
        }
    }

    async getAll() {
        return await User.all()
    }

    async getByUuid(uuid: string) {
        return (await this.getAll()).filter(x => x.uuid === uuid)[0];
    }
}

export const userService = new UserService();