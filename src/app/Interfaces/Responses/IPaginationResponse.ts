export interface IPaginationResponse<T> {
    skip: number,
    take: number,
    totalPages: number,
    currentPage: number,
    totalItems: number,

    rows: T[];
}