import "./App.css";
import { useEffect, useRef, useState } from "react";
import { useMovies } from "./hooks/useMovies";
import { Movies } from "./components/Movies";

function useSearch() {
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if( isFirstInput.current ){
      isFirstInput.current = search === '';
      return;
    }
    if (search === '') {
      setError('No se puede buscar una pelicula vacia');
      return
    }

    if(search.match(/^\d+$/)) {
      setError('No se puede buscar una pelicula con un numero')
      return;
    }

    if(search.length < 3){
      setError('La busqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  }, [search])

  return {search, setSearch, error}
}

function App() {
  const { search, setSearch, error } = useSearch()
  const { movies, loading, getMovies } = useMovies({ search });

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies()
    console.log(search);
    /* const fields = Object.fromEntries(new window.FormData(event.target)) // sirve para hacer un objeto y que cada input sea una propiedad/valor */
  }

  const handleChange = (event) => {
    setSearch(event.target.value)
  };

  

  return (
    <div className="page">
      <header>
        <h1>Buscador de peliculas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input value={search} onChange={handleChange} name="search" placeholder="Avengers, Star Wars, The Matrix.." />
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: 'red'}}>{error}</p>}
      </header>

      <main>
        {
          loading ? <p>Cargando ... </p> : null
        }
        <Movies movies={movies} />
      </main>
    </div>
  );
}

export default App;
