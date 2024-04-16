export interface ClinicPanelProfile {
    clinicId?:            number;
    clinicCode:           string;
    clinicName:           string;
    address:              string;
    districtId:           number;
    cityId:               number;
    postcode:             string;  
    contactNumber:        string;
    bankName:             string;
    bankAccount:          string;
    panelAppointedDate:   string;
    panelContractEndDate: string;
}

// Converts JSON strings to/from your types
export class ClinicPanelProfileConvert {
    public static fromJson(json: string): ClinicPanelProfile {
        return JSON.parse(json);
    }

    public static toJson(value: ClinicPanelProfile): string {
        return JSON.stringify(value);
    }
}