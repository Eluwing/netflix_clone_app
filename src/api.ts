const API_KEY = '';
const BASE_PATH = '';
export async function getMovies(): Promise<any> {
  return await fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    async (response) => await response.json(),
  );
}
