const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray')



module.exports = {
    async index(request, response){
        
        const {latitude, longitude, techs} = request.query;

        techsArray = parseStringAsArray(techs);
        
        const devs = await Dev.find({
            techs: {//especifica filtros
                $in: techsArray,
            },
            location: {
                //verifica localizações perto de outra
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000, //maxima distancia entre um user e outro
                },
            },
        });

        return response.json({ devs});

    }
}