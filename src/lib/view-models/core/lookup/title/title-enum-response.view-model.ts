export interface EnumTitleResponseViewModel {
    status: number;
    message: string;
    data: EnumTitleResponseData;
}

export interface EnumTitleResponseData {
    titles: EnumTitle[];
}

export interface EnumTitle {
    id: number;
    code: string;
    description: string;
}