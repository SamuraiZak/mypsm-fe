export interface NewHireActivity {
    status: number;
    message: string;
    data: ActivityResponseData;
}

export interface ActivityResponseData {
    activityList: ActivityList[];
    isReadonly: boolean;
}

export interface ActivityList {
    name: string;
    joinDate: Date;
    position: string;
    description: string;
}

// Converts JSON strings to/from your types
export class ActivityResponseConvert {
    public static toNewHireActivity(json: string): NewHireActivity {
        return JSON.parse(json);
    }

    public static newHireActivityToJson(value: NewHireActivity): string {
        return JSON.stringify(value);
    }
}
