export interface EnumStateResponse {
    status: number;
    message: string;
    data: EnumStateResponseData;
}

export interface EnumStateResponseData {
    states: State[];
}

export interface State {
    id: number;
    code: string;
    description: string;
}
