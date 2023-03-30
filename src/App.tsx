import { useEffect, useState } from "react";

import { Button } from "./components/Button";
import { MovieCard } from "./components/MovieCard";

import { SideBar } from "./components/SideBar";
import { Content } from "./components/Content";

import { api } from "./services/api";

import "./styles/global.scss";

interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  const runEffect = async () => {
    const moviesResponse = api.get<MovieProps[]>(
      `movies/?Genre_id=${selectedGenreId}`
    );
    const genreResponse = api.get<GenreResponseProps>(
      `genres/${selectedGenreId}`
    );

    const [{ data: moviesData }, { data: genreData }] = await Promise.all([
      moviesResponse,
      genreResponse,
    ]);

    setMovies(moviesData);

    setSelectedGenre(genreData);
  };

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    runEffect();
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar
        genres={genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      />

      <Content
        title={selectedGenre.title}
        movies={movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            title={movie.Title}
            poster={movie.Poster}
            runtime={movie.Runtime}
            rating={movie.Ratings[0].Value}
          />
        ))}
      />
    </div>
  );
}
