export interface EnumDistrictResponseViewModel {
    status:  number;
    message: string;
    data:    EnumDistrictResponseData;
}

export interface EnumDistrictResponseData {
    districts: EnumDistrict[];
}

export interface EnumDistrict {
    id:   number;
    name: string;
}
