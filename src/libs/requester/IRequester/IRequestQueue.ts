export interface IRequestQueue {
    requestQueue: (method: 'GET' | 'POST', url: string, body?: object, headers?: object, timeoutMS?: number) => Promise<any>;
}