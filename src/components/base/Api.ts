import { IApi } from '../../types/index.ts';
type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export class Api implements IApi {
    readonly baseUrl: string;
    protected options: RequestInit;

    constructor(baseUrl: string, options: RequestInit = {}) {
        this.baseUrl = baseUrl;
        this.options = {
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers as object ?? {})
            }
        };
    }

    protected handleResponse<T>(response: Response): Promise<T> {
        if (response.ok) {
            return response.json() as Promise<T>;
        }
        // Возвращаем ошибку в том же формате Promise<T>, чтобы типы совпадали
        return response.json().then(data => 
            Promise.reject(data.error ?? response.statusText)
        );
    }

    get<T = any>(uri: string): Promise<T> {
        // Если нужны params, можно добавить их к URL здесь, пока игнорируем для простоты
        return fetch(this.baseUrl + uri, {
            ...this.options,
            method: 'GET'
        }).then(res => this.handleResponse<T>(res));
    }

    post<T = any>(
        uri: string, 
        data: any, 
        method?: 'POST' | 'PUT'
    ): Promise<T> {
        const httpMethod: ApiPostMethods = (method ?? 'POST') as ApiPostMethods;
        
        return fetch(this.baseUrl + uri, {
            ...this.options,
            method: httpMethod,
            body: JSON.stringify(data)
        }).then(res => this.handleResponse<T>(res));
    }
}