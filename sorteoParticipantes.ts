//Data random
import { faker } from '@faker-js/faker';

//-Types
interface User {
    userId: string | number,
    username: string,
    email: string,
    avatar?: string,
    password: string,
    city: string,
    country: string,
    address: string,
    phone: number | string,
    registeredAt: Date,

}

export interface BaseModel {
    readonly id: string | number,
    readonly createdAt: Date,
    updatedAt: Date,
}

export interface Participant extends User {
    pay: boolean,
    sorteoId: string | number,
}


//---------
export const Participants: Participant[] = [];

export function createParticipant(): Participant {
    return {
        userId: faker.database.mongodbObjectId(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        city: faker.address.city(),
        country: faker.address.country(),
        address: faker.address.streetAddress(),
        phone: faker.phone.number(),
        pay: true,
        registeredAt: new Date(),
        sorteoId: faker.database.mongodbObjectId(),
    }
}

for(let i = 0; i < 3; i++) {
    Participants.push(createParticipant())
}
console.log(Participants)
console.log(Participants.length)