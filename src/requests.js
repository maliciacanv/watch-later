import axios from 'axios';

const searchAnime = (query) => {
    return axios.get(`https://api.jikan.moe/v3/search/anime?q=${query}`)
}

export default searchAnime;