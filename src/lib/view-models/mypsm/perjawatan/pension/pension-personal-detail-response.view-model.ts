export interface PensionPersonalDetailResponse {
    status: number;
    message: string;
    data: Data;
}

export interface Data {
    employee: Employee;
}

export interface Employee {
    employeeNo: string;
    name: string;
    otherName: string;
    identityCard: string;
    identityCardColor: string;
    dateOfBirth: string;
    placeOfBirth: string;
    nationality: string;
    race: string;
    religion: string;
    gender: string;
    status: string;
    homeAddress: string;
    mailAddress: string;
    homeNo: string;
    mobileNo: string;
    housing: string;
    houseLoan: string;
    isExPolice: string;
}
