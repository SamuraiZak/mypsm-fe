export type OutsiderId = {
    outsiderId: number;
};

export class OutsiderIdConvert {
    public static fromJson(json: string): OutsiderId {
        return JSON.parse(json);
    }

    public static toJson(value: OutsiderId): string {
        return JSON.stringify(value);
    }
}