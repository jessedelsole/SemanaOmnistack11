const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    
    async create(request, response){
        const {name, email,whatsapp, city, uf} = request.body;
        const id = crypto.randomBytes(4).toString('HEX');
       
        console.log( request.body)    

        try{
        await connection('ongs').insert(
            {
                id,
                name,
                email,
                whatsapp,
                city,
                uf,
            }
        );
        } catch(err){
            console.log(err);
        }


        response.json({id});

    },

    async index (request, response) {
        const ongs = await connection('ongs').select('*');
     
        return response.json(ongs);
    }






}