import { userService } from './src/services/user.service.ts';
import { venueService } from './src/services/venue.service.ts';
import { databaseService } from './src/database/database.service.ts';
import { v4 as uuidv4 } from './depts.ts';

function testPasswordMatching() {
    const password = 'THIS_IS_MY_PASSWORD';
    const salt = 'secretcombination123'
    
    const encrypted = userService.hashPassword(password, salt);
    console.log(encrypted);
    
    const falsePassword = 'THIS_IS_NOT_MY_PASSWORD';
    
    const passwordsMatch = userService.checkPassword(password, encrypted.password, salt);
    console.log(`passwords match: ${passwordsMatch}`);
}

function testSalt() {
    console.log('TESTSALT')
    for(let i = 0; i < 99; i++) console.log(userService.encryptPassword(''));
}

// testSalt();

async function createUser() {
    await databaseService.connect();

    const data = {
        firstName: 'Test',
        lastName: 'Tester',
        email: 'test@test.te',
        password: 'Test1234',
        role: 'OWNER'
    }

    const val = await userService.register(data);
    
    console.log(val)

    // const users = await userService.getAll();
    // console.log(users)
}

await createUser();

async function login() {
    await databaseService.connect();

    const data = {
        email: 'test@test.te',
        password: 'Test1234'
    }

    const token = await userService.login(data);
    console.log(token)
}

// await login();

async function addVenue() {
    await databaseService.connect();

    const data = {
        uuid: uuidv4.generate(),
        name: 'TestVenue',
        longitude: 0.0,
        latitude: 0.0,
        address: 'testaddress 81',
        availableSpots: 420,
        ownerId: 1
    }

    const user = await venueService.create(data);

    console.log(user);
}

// await addVenue();