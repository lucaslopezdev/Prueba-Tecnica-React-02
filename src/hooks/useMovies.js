import { searchMovies } from "../services/movies";
import { useState, useRef, useMemo, useCallback } from "react";

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const previousSearch = useRef(search);
  
  const getMovies = useCallback(async ({search}) => {
    if (search === previousSearch.current) return;
  
    try {
      setLoading(true);
      setError(null);
      previousSearch.current = search;
      const newMovies = await searchMovies({ search });
      setMovies(newMovies);
    } catch (error) {
      setError(error.message);
    } finally {
      // Finally se va a ejecutar tanto en el try como en el catch
      setLoading(false);
    }
  }, [])
  
  
  const sortedMovies = useMemo(() => {
    return sort
    ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
    : movies;
  }, [sort, movies]);
  
  if(error) return error;
  
  return { movies: sortedMovies, getMovies, loading };
}
