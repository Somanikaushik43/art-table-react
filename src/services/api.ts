import axios from 'axios';
import type {Artwork} from '../types/artwork';

const BASE_URL='https://api.artic.edu/api/v1/artworks';

export const fetchArtworks=async(page:number):Promise<Artwork[]>=>{
    const response=await axios.get(`${BASE_URL}?page=${page}`);
    return response.data.data;
};