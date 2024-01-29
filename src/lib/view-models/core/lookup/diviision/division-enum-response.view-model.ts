export interface EnumDivisionResponseViewModel {
    status:  number;
    message: string;
    data:    EnumDivisionResponseData;
}

export interface EnumDivisionResponseData {
    divisions: EnumDivision[];
}

export interface EnumDivision {
    id:   number;
    name: string;
}
