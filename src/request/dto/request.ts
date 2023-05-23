export const availableRequestMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
export type RequestMethod = typeof availableRequestMethods[number];

export interface RequestResponse {
    id: string;
    receivedAt: Date;
    code: number;
    body: Record<string, any>;
}

export interface RequestHook {
    id: string;
    url: string;
    headers?: Record<string, string>;
    body?: Record<string, any>;
    method: RequestMethod;
    createdAt: Date;
    sendAt: Date;
    isSended: boolean;
    sendedAt: Date;
    response?: RequestResponse;
}