export interface MovingOutSetDirector {
    id:      number;
    directorApproverId: number;
}

// Converts JSON strings to/from your types
export class movingOutSetDirectorConvert {
    public static fromjson(json: string): MovingOutSetDirector {
        return JSON.parse(json);
    }

    public static toJson(value: MovingOutSetDirector): string {
        return JSON.stringify(value);
    }
}