export interface ResponseLettercertificationDetailDTO {
    interimId: number;
    status:    boolean;
    remark:    string;
    sendDate:  Date;
    note:      string;
}

// Converts JSON strings to/from your types
export class ResponseLettercertificationDetailDTOonvert {
    public static fromJson(json: string): ResponseLettercertificationDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(value: ResponseLettercertificationDetailDTO): string {
        return JSON.stringify(value);
    }
}