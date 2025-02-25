export interface IResponse<T> {
    isError: boolean;
    message: string | { [key: string]: string };
    errors: { [key: string]: string[] };
    data: T;
}