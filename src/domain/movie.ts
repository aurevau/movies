export type Movie = {
    id: number, 
    title: string,
    poster_path: string | null;
    genre_ids: number[];
    vote_average: number;
    vote_count: number;
    release_date: string;
    popularity: number;
}