export interface IRestPut {
    put: (url: string, body?: object, headers?: object,  timeoutMS?: number) => Promise<any>;
}