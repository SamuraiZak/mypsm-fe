export interface EnumUnitResponseViewModel {
    status:  number;
    message: string;
    data:    EnumUnitResponseData;
}

export interface EnumUnitResponseData {
    units: EnumUnit[];
}

export interface EnumUnit {
    id:   number;
    name: string;
}
