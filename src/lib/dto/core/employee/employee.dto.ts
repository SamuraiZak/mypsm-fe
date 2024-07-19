export interface EmployeeDetailExtendedDTO {
    fullName: string | null;
    alternateName: string | null;
    identityCardNumber: string | null;
    identityCardColor: string | null;
    employeeNumber: string | null;
    dateOfBirth: string | null;
    citizenship: string | null;
    race: string | null;
    religion: string | null;
    gender: string | null;
    maritalStatus: string | null;
    homeAddress: string | null;
    mailingAddress: string | null;
    homePhoneNumber: string | null;
    mobilePhoneNumber: string | null;
    isExMilitary: boolean | null;
    grade: string | null;
    position: string | null;
    placement: string | null;
}

export interface EmployeeLookupDTO {
    pageNum:   number;
    pageSize:  number;
    orderBy:   null;
    orderType: null;
    filter:    Filter;
}

export interface Filter {
    program:        string;
    employeeNumber: null;
    name:           null;
    identityCard:   null;
    grade:          null;
    role:           number;
}

export interface EmployeeLookupItemDTO {
    employeeId:     number;
    employeeNumber: string;
    name:           string;
    identityCard:   string;
    placement:      string;
}
