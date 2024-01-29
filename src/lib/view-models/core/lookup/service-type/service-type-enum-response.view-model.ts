export interface EnumServiceTypeResponseViewModel {
    status:  number;
    message: string;
    data:    EnumServiceTypeResponseData;
}

export interface EnumServiceTypeResponseData {
    serviceTypes: EnumServiceType[];
}

export interface EnumServiceType {
    id:   number;
    name: string;
}
