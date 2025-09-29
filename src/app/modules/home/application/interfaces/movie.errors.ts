export interface MoviesError extends Error {
  message: string;
  status: number;
  error: any;
}