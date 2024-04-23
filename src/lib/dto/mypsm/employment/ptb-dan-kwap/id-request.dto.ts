export type PTBIDRequestBodyDTO = {
    id: number;
};

export class PTBIDRequestBodyDTOConvert {
    public static fromJson(json: string): PTBIDRequestBodyDTO {
        return JSON.parse(json);
    }

    public static toJson(value: PTBIDRequestBodyDTO): string {
        return JSON.stringify(value);
    }
}

export type PensionId = {
    pensionId: number;
};

export class PensionIdConvert {
    public static fromJson(json: string): PensionId {
        return JSON.parse(json);
    }

    public static toJson(value: PensionId): string {
        return JSON.stringify(value);
    }
}