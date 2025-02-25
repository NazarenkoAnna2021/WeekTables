export interface IRestDelete {
    delete: (url: string, body?: object, headers?: object,  timeoutMS?: number) => Promise<any>;
}