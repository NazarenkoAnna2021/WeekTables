export interface IRestPatch {
    patch: (url: string, body?: object, headers?: object,  timeoutMS?: number) => Promise<any>;
}