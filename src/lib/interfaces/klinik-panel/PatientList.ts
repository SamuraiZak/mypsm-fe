/* eslint-disable @typescript-eslint/no-unused-vars */
interface IPatient {
    [key: string]: { patient: string; noKP: string; treatment: ITreatment };
}

interface IStaffPatient {
    name: string;
    noKp: string;
    patients: IPatient;
}
