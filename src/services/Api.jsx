import axios from "axios";

axios.defaults.baseURL = `https://pixabay.com/api`;
const API_KEY = '35866753-ee5e4fb02ae2dcf2727fa9b13';


export async function PostsApi(query, page, perPage, signal) {
  const response = await axios.get('/',
   {
    signal, 
    params: {
        q: query,
        key: API_KEY,
        page: page,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: perPage, 
    }
   });
   return response.data;
  }
  

