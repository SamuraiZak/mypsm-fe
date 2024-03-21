export interface GetContractActivityDetailDTO {
    activityList: ActivityList[];
    isReadonly:   boolean;
}

export interface ActivityList {
    name:        string;
    joinDate:    Date;
    position:    string;
    description: string;
}