export default interface PaginationModel<T> {
  count: number;
  next?: string;
  previous?: string;
  results: T
}