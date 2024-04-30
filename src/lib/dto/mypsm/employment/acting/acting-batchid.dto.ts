export type ActingCommonBatchId = {
    batchId: number;
};

export class ActingCommonBatchIdConvert {
    public static fromJson(json: string): ActingCommonBatchId {
        return JSON.parse(json);
    }

    public static toJson(value: ActingCommonBatchId): string {
        return JSON.stringify(value);
    }
}

export type ActingCommonId = {
    actingIds: number;
}

export class ActingCommonIdConvert {
    public static fromJson(json: string): ActingCommonId {
        return JSON.parse(json);
    }

    public static toJson(value: ActingCommonId): string {
        return JSON.stringify(value);
    }
}