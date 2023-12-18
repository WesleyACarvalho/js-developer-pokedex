// Classe Pokemon para representar os dados de um Pokémon
class Pokemon {
    constructor() {
        this.number = 0;
        this.name = '';
        this.types = [];
        this.type = '';
        this.photo = '';
        this.abilities = '';
        this.species = '';
        this.height = 0;
        this.weight = 0;
        this.id = 0;
        this.ability = '';
        this.stats = [];
        this.baseStat = 0;
        this.stat = [];
        this.nameStats = '';
    }
}

// Objeto pokeApi contendo métodos para obter detalhes de Pokémon e lista de Pokémon
const pokeApi = {};

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails);
};

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;
    pokemon.types = types;
    pokemon.type = type;
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
    const abilities = pokeDetail.abilities.map((ability) => ability.ability.name).join(', ');
    pokemon.abilities = abilities;
    pokemon.species = pokeDetail.species.name;
    pokemon.height = pokeDetail.height;
    pokemon.weight = pokeDetail.weight;
    pokemon.id = pokeDetail.id;
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;
    pokemon.types = types;
    pokemon.type = type;
    const abilities = pokeDetail.abilities.map((ability) => ability.ability.name).join(', ');
    pokemon.abilities = abilities;
    pokemon.species = pokeDetail.species.name;
    pokemon.height = pokeDetail.height;
    pokemon.weight = pokeDetail.weight;
    const stats = pokeDetail.stats.map((statValue) => statValue.base_stat);
    const [baseStat] = stats;
    pokemon.stats = stats;
    pokemon.baseStat = baseStat;
    const stat = pokeDetail.stats.map((statName) => statName.stat.name);
    const [nameStats] = stat;
    pokemon.stat = stat;
    pokemon.nameStats = nameStats;

    return pokemon;
}

// Exemplo de uso da PokeAPI para obter Pokémons
const offset = 0;
const limit = 10;

pokeApi.getPokemons(offset, limit)
    .then((pokemons) => {
        console.log(pokemons); // Aqui você pode fazer algo com os Pokémons obtidos
    })
    .catch((error) => {
        console.error('Erro ao obter Pokémons:', error);
    });
