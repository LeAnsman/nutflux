import { async } from "@firebase/util";
import {
  createSlice,
  createAsyncThunk,
  configureStore,
} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
};

export const getGenres = createAsyncThunk("nutflux/genres", async () => {
  const {
    data: { genres },
  } = await axios.get(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${
      import.meta.env.VITE_TMDB_API_KEY
    }`
  );
  return genres;
});

export const createArrayFromRawData = (array, moviesArray, genres) => {
  array.map((movie) => {
    const movieGenres = [];
    movie.genre_ids.map((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenres.push(name.name);
    });
    if (movie.backdrop_path)
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      });
  });
};

const getRawData = async (api, genres, paging = false) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    createArrayFromRawData(results, moviesArray, genres);
  }
  return moviesArray;
};

export const fetchMovies = createAsyncThunk(
  "nutflux/trending",
  async ({ type }, thunkApi) => {
    const {
      nutflux: { genres },
    } = thunkApi.getState();
    return getRawData(
      `https://api.themoviedb.org/3/trending/${type}/week?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }`,
      genres,
      true
    );
  }
);

const NutfluxSlice = createSlice({
  name: "nutflux",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  },
});

export const store = configureStore({
  reducer: {
    nutflux: NutfluxSlice.reducer,
  },
});
