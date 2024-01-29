export interface EnumSectionResponseViewModel {
    status:  number;
    message: string;
    data:    EnumSectionResponseData;
}

export interface EnumSectionResponseData {
    sections: EnumSection[];
}

export interface EnumSection {
    id:   number;
    name: string;
}
