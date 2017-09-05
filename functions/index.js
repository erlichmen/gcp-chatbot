const functions = require("firebase-functions");
const axios = require("axios");
const pokemonBattle = require("./pokemon-battle");

exports.fight = functions.https.onRequest((req, res) => {
    const pokemon1 = req.body.result.parameters.pokemon1;
    const pokemon2 = req.body.result.parameters.pokemon2;

    console.log(pokemon1);
    console.log(pokemon2);
    console.log(req.body.result);

    axios.all([
        axios.get('http://pokeapi.co/api/v2/pokemon/' + pokemon1),
        axios.get('http://pokeapi.co/api/v2/pokemon/' + pokemon2)
    ]).then(axios.spread((response1, response2) => {
        const [battleResults, winner] = pokemonBattle.battle(response1.data.id, response2.data.id);

        const winnerName = winner.mainPokemon.name.toLowerCase();
        const winnerData = winnerName === pokemon1 ? response1 : response2;

        res.json({"speech": battleResults + " " + winnerData.data.sprites.front_default});
    }));
});