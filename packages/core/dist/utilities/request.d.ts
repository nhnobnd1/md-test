export declare const formData: (body: {
    [key: string]: any;
}, prefix?: string, form?: FormData) => FormData;
export declare const urlEncoded: (body: {
    [key: string]: any;
}, prefix?: string, form?: URLSearchParams) => URLSearchParams;
