import { IRequester } from ".";
import { loggerModel } from "../../UIKit/logger/entity/loggerModel";

class FetchRequester implements IRequester {

    private getHeaders = (headers?: object) => {
        const result: any = {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        };
        if (headers) {
            Object.assign(result, headers);
        }
        return result;
    }

    postFormData = async (url: string, data: FormData) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Accept': '*/*', 'Content-Type': 'multipart/form-data' },
                body: data,
            });
            const result = await response.json();
            loggerModel.add('response', 'FetchRequester -> postFormData: ' + url, result);
            return { data: result, status: response.status };
        } catch (error: any) {
            console.warn('FetchRequester -> postFormData: ' + url, error);
            loggerModel.add('error', 'FetchRequester -> postFormData: ' + url, error);
            return error?.response || {};
        }
    }

    post = async (url: string, body?: object, headers?: object): Promise<any> => {
        try {
            const config: RequestInit = {
                method: 'POST',
                headers: this.getHeaders(headers),
                body: body ? JSON.stringify(body) : undefined,
            };
            const response = await fetch(url, config);
            const result = await response.json();
            loggerModel.add('response', 'FetchRequester -> post: ' + url, result);
            return this.processingResponse({ data: result, status: response.status });
        } catch (error: any) {
            console.warn('FetchRequester -> post: ' + url, error);
            loggerModel.add('error', 'FetchRequester -> post: ' + url, error);
            return error?.response || {};
        }
    }

    delete = async (url: string, body?: object, headers?: object): Promise<any> => {
        try {
            const config: RequestInit = {
                method: 'DELETE',
                headers: this.getHeaders(headers),
                body: body ? JSON.stringify(body) : undefined,
            };
            const response = await fetch(url, config);
            const result = await response.json();
            loggerModel.add('response', 'FetchRequester -> delete: ' + url, result);
            return this.processingResponse({ data: result, status: response.status });
        } catch (error: any) {
            console.warn('FetchRequester -> delete: ', error);
            loggerModel.add('error', 'FetchRequester -> delete: ' + url, error);
            return error?.response || {};
        }
    }

    put = async (url: string, body?: object, headers?: object): Promise<any> => {
        try {
            const config: RequestInit = {
                method: 'PUT',
                headers: this.getHeaders(headers),
                body: body ? JSON.stringify(body) : undefined,
            };
            const response = await fetch(url, config);
            const result = await response.json();
            loggerModel.add('response', 'FetchRequester -> put: ' + url, result);
            return this.processingResponse({ data: result, status: response.status });
        } catch (error: any) {
            console.warn('FetchRequester -> put: ', error);
            loggerModel.add('error', 'FetchRequester -> put: ' + url, error);
            return error?.response || {};
        }
    }

    patch = async (url: string, body?: object, headers?: object): Promise<any> => {
        try {
            const config: RequestInit = {
                method: 'PATCH',
                headers: this.getHeaders(headers),
                body: body ? JSON.stringify(body) : undefined,
            };
            const response = await fetch(url, config);
            const result = await response.json();
            loggerModel.add('response', 'FetchRequester -> patch: ' + url, result);
            return this.processingResponse({ data: result, status: response.status });
        } catch (error: any) {
            console.warn('FetchRequester -> patch: ', error);
            loggerModel.add('error', 'FetchRequester -> patch: ' + url, error);
            return error?.response || {};
        }
    }

    get = async (url: string, headers?: object): Promise<any> => {
        try {
            const config: RequestInit = {
                method: 'GET',
                headers: this.getHeaders(headers),
            };
            const response = await fetch(url, config);
            const result = await response.json();
            loggerModel.add('response', 'FetchRequester -> get: ' + url, result);
            return this.processingResponse({ data: result, status: response.status });
        } catch (error: any) {
            console.warn('FetchRequester -> get: ' + url, error);
            loggerModel.add('error', 'FetchRequester -> get: ' + url, error);
            return error?.response || {};
        }
    }

    private processingResponse = (response: any) => {
        let result: any = { isError: true, message: '', errors: {} };
        if (response?.status < 400) {
            result = { isError: false, data: response?.data || response, errors: response?.errors };
        } else {
            console.error('FetchRequester -> processingResponse: ', JSON.stringify(response, null, ' '));
            loggerModel.add('error', 'FetchRequester -> processingResponse: ', response);
            result = { isError: true, message: response?.data?.message, errors: response?.data?.errors };
        }
        return result;
    }

}

export const requester = new FetchRequester();
