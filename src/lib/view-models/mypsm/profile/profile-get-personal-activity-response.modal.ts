export interface GetPersonalActivityResponse {
    status:  number;
    message: string;
    data:    Data;
}

export interface Data {
    activityList: ActivityList[];
}

export interface ActivityList {
    id:          string;
    name:        string;
    position:    string;
    joinDate:    Date;
    description: string;
}
