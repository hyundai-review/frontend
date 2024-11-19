export const fetchBoxOfficeMovies = async (get) => {
  const response = await get('/movies/boxoffice')
  return response.data.movies
}
