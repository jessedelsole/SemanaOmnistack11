const connection = require('../database/connection');

module.exports = {
   
    //cadastro do incidente
    async create(request, response){
          const {title, description, value } = request.body;

          const ong_id = request.headers.authorization;
          
          const result = await connection('incidents').insert({
              title,
              description,
              value,
              ong_id
          });

          const id = result[0];

          return response.json({ id })

    },
   

    //Lista incidentes
    async index(request, response){

      //retorna qtd de registros
      //entre colchetes, pega primeira poisicao do array
      const [count] = await connection('incidents').count()   

      //geralmente o total de registros é retornardo no header
      //count(*) é o nome da propriedade retornado
       response.header('X-Total-Count',count['count(*)']); 

      //* esquema de paginação via query param , 5 por vez ( ?page=x )  
      const { page = 1 } = request.query;
            
      

        const incidents =  await connection('incidents')
        .join('ongs', 'ongs.id','=', 'incidents.ong_id')
        .limit(5)
        .offset( (page - 1) * 5)  //pula x registros
        .select( ['incidents.*', 'ongs.name','ongs.email','ongs.whatsapp','ongs.city','ongs.uf' ]  );

        return response.json(incidents);

    },

    //Deleta incidente
    async delete( request, response){
        const {id} = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents').
           where('id', id).select('ong_id').first();
       
        if ( incident.ong_id != ong_id){
            return response.status(401).json({error: 'Operation not permitted'})
        }   

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();

    }
}