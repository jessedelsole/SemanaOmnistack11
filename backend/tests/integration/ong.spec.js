const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', ()=> {
   
    beforeEach( async() => {
        await connection.migrate.rollback();//desfazmigrations
        await connection.migrate.latest();
    });    

    afterAll( async ()=>{
        await connection.destroy();
    })

    it ('should be able to crete a new ONG', async () =>{

            const response = await request(app)
              .post('/ongs')
              //.set('Authorization', 'asdf')
              .send(
                {
                    name : "APAD 4",
                    email: "contato@apad.com.br",
                    city:"Rio do Sulxxx",
                    whatsapp: "12345678901",
                    uf: "RS"
                }
            );


            expect(response.body).toHaveProperty('id');
            expect(response.body.id).toHaveLength(8);


            console.log(response.body);

    });
});