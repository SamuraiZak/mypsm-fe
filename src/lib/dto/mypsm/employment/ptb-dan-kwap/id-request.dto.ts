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