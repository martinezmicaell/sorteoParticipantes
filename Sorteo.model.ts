import { participants, Participant } from "./Participante.model"
import { Product } from "./Product.model"
import { BaseModel } from "./BaseModel.model"
import { faker } from "@faker-js/faker"

// date == 7 dias antes de que sea el Sorteo, 7 días antes se le va a avisar a cada Participante por Mail que el sorteo va a ser en 1 semana.

//minCollectPayout: Cantidad de dinero minima para cubrir(collect) el costo del product y lanzar el Sorteo (calcular por cada sorteo.)
//sorteoId: Identificador que identifica a cada uno de los sorteos.
//dateSort: //Dia del sorteo
export interface Sorteo extends BaseModel {
    minCollectPayout: number,
    product: Product,
    dateSort: Date,
    sorteoId: string | number,
    participants: Participant[],

}


//- Data Transfer Object (DTO)s  de Sorteo.
export interface CreateSorteo extends Omit<Sorteo, 'sorteoId' | 'createdAt' | 'updatedAt'> {

}

export interface UpdateSorteo extends Partial<Sorteo> {

}



//-----//-----//-----//-- Services --//-----//-----//-----//-----//----
export const sorteos: Sorteo[] = []


export const createSorteo = (data: CreateSorteo): Sorteo => {
    const newSorteo = {
        ...data,
        sorteoId: faker.database.mongodbObjectId(),
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
    }

    sorteos.push(newSorteo)
    return newSorteo
}


//Un Sorteo se puede actualizar (cambiar) la fecha en la que se va a Sortear, por eso se hace un update.
export const updateSorteo = (id: Sorteo['sorteoId'], changes: UpdateSorteo): Sorteo => {
    const index = sorteos.findIndex(sorteo => sorteo.sorteoId === id)
    const prevData = sorteos[index]
    sorteos[index] = {
        ...prevData,
        ...changes
    }
    return sorteos[index]
}


export const joinParticipantToSorteo = (participant: Participant, id: Sorteo['sorteoId']): Participant[] => {
    //un Participant ya ha pagado, esta fn se ejecuta justo despues de haberse realizado el pago.
    const index = sorteos.findIndex(sorteo => sorteo.sorteoId === id)
    const arrayParticipants = sorteos[index].participants

    arrayParticipants.push(participant)

    return arrayParticipants
}