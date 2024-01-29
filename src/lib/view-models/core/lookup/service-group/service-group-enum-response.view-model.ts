export interface EnumServiceGroupResponseViewModel {
    status:  number;
    message: string;
    data:    EnumServiceGroupResponseData;
}

export interface EnumServiceGroupResponseData {
    serviceGroups: EnumServiceGroup[];
}

export interface EnumServiceGroup {
    id:   number;
    name: string;
}
