const connection = require('../database/connection');
const crypto = require('crypto');
const generateUniqueId = require('../utils/gererateUniqueId');

module.exports = {
    
    async create(request, response){
        const {name, email,whatsapp, city, uf} = request.body;
        
        const id = generateUniqueId();
       
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