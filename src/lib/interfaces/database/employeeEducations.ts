/* eslint-disable @typescript-eslint/no-unused-vars */
interface IntEmployeeEducations {
    id: number;
    employeeId: number;
    type: string;
    instituteName: string;
    course?: string;
    completionYear: string;
    finalGrade: string;
    remark: string[];
}
