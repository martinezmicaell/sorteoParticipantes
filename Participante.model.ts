//Data random
import { faker } from '@faker-js/faker';
import { BaseModel } from './BaseModel.model';
//-Types
export interface User extends BaseModel {
    userId: string | number,
    username: string,
    email: string,
    avatar?: string,
    password: string,
    city: string,
    country: string,
    address: string,
    phone: number | string,
}


//pay: tiene que ser si o si ser pay: true para que sea Participant.
//sorteoId: Se le asigna el id del sorteo, porque a futuro pueden haber varios.
export type Payed = true

//Un participante es un user, pero con propiedades extras.
export interface Participant extends User {
    payed: Payed,
    sorteoId: string | number,
}

//
export interface VincularParticipante extends Pick<Participant, 'payed' | 'sorteoId'> {}


//---------
//En un sorteo hay varios participantes.
export const participants: Participant[] = []

export const users: User[] = []


//- Create a user
export function createUser(): User {
    return {
        userId: faker.database.mongodbObjectId(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        city: faker.address.city(),
        country: faker.address.country(),
        address: faker.address.streetAddress(),
        phone: faker.phone.number(),
        createdAt: new Date(),
        updatedAt: new Date(),
    }
}

export function createParticipant(user: User, vincularASorteo: VincularParticipante): Participant {
    const newParticipant = {
        ...user,
        ...vincularASorteo
    }

    return newParticipant
}