export interface PutPersonalExperiencesRequest {
    experienceId: number;
    company:      string;
    address:      string;
    position:     string;
    positionCode: string;
    startDate:    Date;
    endDate:      Date;
    salary:       number;
}
