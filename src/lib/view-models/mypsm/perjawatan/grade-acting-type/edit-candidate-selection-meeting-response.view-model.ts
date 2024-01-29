export interface EditCandidateSelectionMeeting {
    status:  number;
    message: string;
    data:    Data;
}

export interface Data {
    secretaryName: string;
    directorName:  string;
    employees:     Employee[];
}

export interface Employee {
    name: string;
}