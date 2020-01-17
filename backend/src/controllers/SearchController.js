const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray')



module.exports = {
    async index(request, response){

        
        
        const {longitude, latitude, techs} = request.query;

        const techsArray = parseStringAsArray(techs);
        
        const devs = await Dev.find({
            techs: {//especifica filtros
                $in: techsArray
            },
            location: {
                //verifica localizações perto de outra
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 100000000000 //maxima distancia entre um user e outro
                }
            }
        })

       response.json( devs );

    }
}