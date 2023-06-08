import { searchMovies } from "../services/movies";
import { useState } from "react";

export function useMovies({ search }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)

  const getMovies = async () => {
    try {
      setLoading(true)
      setError(null)
      const newMovies = await searchMovies({ search });
      setMovies(newMovies)
    } catch (error) {
      setError(error.message)
    } finally {
      // Finally se va a ejecutar tanto en el try como en el catch
      setLoading(false)
    }
  };

  return { movies, getMovies, loading };
}
