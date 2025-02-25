export interface IFormDataRequest {
    postFormData: (url: string, body: FormData) => Promise<any>;
}