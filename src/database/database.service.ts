import { Database, MySQLConnector, Relationships } from '../../deps.ts';
import Reservation from "../models/reservation.model.ts";
import User from "../models/user.model.ts";
import Venue from "../models/venue.model.ts";

class DatabaseService {
    async connect(){
        // connection options
        const connector = new MySQLConnector({
            database: 'bp-test',
            host: '127.0.0.1',
            username: 'root',
            password: 'root',
            port: 3306, // optional
        });
        
        // create DB
        const db = new Database(
        connector,
        {debug: true}
        );

        // add models
        db.link([Reservation, User, Venue])

        // add relationships
        // Relationships.belongsTo(Reservation, User, { foreignKey: 'userId' });
        // Relationships.belongsTo(Reservation, Venue, { foreignKey: 'venueId' });
        // Relationships.belongsTo(Venue, User, { foreignKey: 'ownerId' });

        // sync db
        await db.sync();
        
    }
}

export const databaseService = new DatabaseService();