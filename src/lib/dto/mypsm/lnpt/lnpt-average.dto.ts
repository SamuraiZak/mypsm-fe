export interface LnptAverageDTO {
    employeeID: number;
    employeeNumber: string;
    name: string;
    icNumber: string;
    category: string;
    grade: string;
    position: string;
    firstYear: number;
    secondYear: number;
    thirdYear?: number;
    average: number;
}

// Converts JSON strings to/from your types
export class LnptAverageConvert {
    public static toLnptAverageDTO(json: string): LnptAverageDTO {
        return JSON.parse(json);
    }

    public static lnptAverageDTOToJson(value: LnptAverageDTO): string {
        return JSON.stringify(value);
    }
}
