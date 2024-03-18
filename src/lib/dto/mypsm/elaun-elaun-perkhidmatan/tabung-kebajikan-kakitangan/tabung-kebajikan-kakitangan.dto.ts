export interface ServiceAllowanceTabungKebajikanDetailDTO {
    allowanceId: number;
    allowanceTypeCode: string;
    allowanceType: string;
    welfareCode: string;
    welfareType: string;
}

// Converts JSON strings to/from your types
export class ServiceAllowanceTabungKebajikanDetailConvert {
    public static fromJson(
        json: string,
    ): ServiceAllowanceTabungKebajikanDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(
        value: ServiceAllowanceTabungKebajikanDetailDTO,
    ): string {
        return JSON.stringify(value);
    }
}
