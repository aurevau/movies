import { Genre } from "@/domain/genre";
import { Movie } from "@/domain/movie";
import { MovieFilters } from "@/domain/movie-filters";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = process.env.EXPO_PUBLIC_TMDB_ACCESS_TOKEN;

const headers = {
    accept: "application/json",
    Authorization: `Bearer ${TOKEN}`
};

export const discoverMovies = async ({ genreIds = [], sortBy = "popularity.desc", page = 1 }: MovieFilters = {}): Promise<Movie[]> => {
    const params = new URLSearchParams({
        language: "sv-SE",
        sort_by: sortBy,
        page: String(page),
        "vote_count.gte": "50",
    });

    if (genreIds.length) params.set("with_genres", genreIds.join(","));

    const res = await fetch(`${BASE_URL}/discover/movie?${params}`, {
        headers });

        if (!res.ok) throw new Error(`Could not load movies (error ${res.status})`);
        return (await res.json()).results;
}

export const getTopRatedMovies = async (page = 1): Promise<Movie[]> => {
    const res = await fetch(`${BASE_URL}/movie/top_rated?language=sv-SE&page=${page}`, {headers});
    if (!res.ok) throw new Error(`Could not load top rated movies (error ${res.status})`);
    return (await res.json()).results;
};

export const getMovie = async (id: number) => {
    const res = await fetch(`${BASE_URL}/movie/${id}?language=sv-SE`, {
        headers
    });

    if (!res.ok) throw new Error(`Could not load movie (error ${res.status})`);
    return res.json();
};

export const getGenres = async () : Promise<Genre[]> => {
    const res = await fetch(`${BASE_URL}/genre/movie/list?language=sv-SE`, {headers});
    if (!res.ok) throw new Error(`Could not load genres (error ${res.status})`);
    return (await res.json()).genres;
}