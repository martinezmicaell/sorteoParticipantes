import { createSorteo, CreateSorteo , updateSorteo, sorteos, joinParticipantToSorteo } from "./Sorteo.model";
import { Product, CreateProduct,  createProduct, products } from "./Product.model";
import { Participant, createParticipant , participants, createUser, users, Payed } from "./Participante.model";
import { faker } from "@faker-js/faker";

//Se crea el producto a sortear

const productASortear = createProduct({
    title: faker.commerce.productName(),
    image: faker.image.business(),
    description: faker.commerce.productDescription(),
    price: parseInt(faker.commerce.price(200000, 1000000, 0)),
    isNew: faker.datatype.boolean(),
    tags: faker.helpers.arrayElements(),
    stock: faker.datatype.number({min: 1, max: 1}),
})

//Se crea el sorteo y lo añade al array sorteos.

const sorteoVigente = createSorteo({
    dateSort: faker.date.future(1, new Date()),
    minCollectPayout: (productASortear.price * 1.10),
    participants: participants,
    product: productASortear
})

//Se crean 3 users.
for (let i = 0; i < 3; i++) {
    users.push(createUser())
}
// console.log('USERS:')
// console.log('-'.repeat(50))
// console.log(users)
// console.log('-'.repeat(50))



//Se crea el Participante --> si pasó el checkout(pagó) en MercadoPago, pasa a ser un Participante (convierto un user a Participante ya que 'Pagó' con la API MercadoPago)
// Emulando la Creación de un Participant.

const pagado: Payed = true

if(pagado) {
    //puedo add el user y le añado los 2 nuevos campos.
    const newParticipant = createParticipant(users[1], {
        payed: true,
        sorteoId: sorteoVigente.sorteoId
    })

    //Se lo une al sorteo
    const actualiceParticipantsSorteo = joinParticipantToSorteo(newParticipant, sorteoVigente.sorteoId)
    // console.log(actualiceParticipantsSorteo)

}

console.log('Sorteos:')
console.log('-'.repeat(50))
console.log(sorteos)
console.log('-'.repeat(50))


console.log('Participantes del Sorteo Vigente:')
console.log('-'.repeat(50))
console.log(sorteos[0].participants)
console.log('-'.repeat(50))


