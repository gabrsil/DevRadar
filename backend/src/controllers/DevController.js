const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray')


//index, show, store, update, destroy

module.exports = {

    async index (request, response){

        const devs = await Dev.find(); // acha tod

    

        return response.json(devs);
       


    },



    async store (request, response) {
   
        const {github_username, techs, latitude, longitude} = request.body;
    
         let dev = await Dev.findOne({ github_username });

        if(!dev) {

            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
        //continuar
        const {name = login, avatar_url, bio} = apiResponse.data;
        //se name não existir - name = login substitui
        console.log(name, avatar_url, bio);
    
        const techsArray = parseStringAsArray(techs);
        //map mapeia posições do vetor e permite executar alguma função para essas posições
    
         const location = {
             type: 'Point',
             coordinates: [longitude, latitude]
         }
    
        const dev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location
            
            //se nome da propriedade não for igual ao da variavel
            //colocar nome original da variavel antes
        })
        return response.json(dev);
        }

        
        
        
    
    
       
    },




};