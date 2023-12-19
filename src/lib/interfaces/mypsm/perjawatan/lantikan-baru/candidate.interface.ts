import type { INewHireProcess } from './new-hire-process.interface';

export interface INewHireStage1 {
    id: number;
    name: string;
    candidateId: number;
    identityDocumentNumber: string;
    email: string;
    link: string;
}

export interface INewHireStage2 {
    id: number;
    name: string;
    candidateId: number;
    identityDocumentNumber: string;
    category: string;
    applicationDate: Date;
    newRecruitEffectiveDate: Date;
    retirementDate: Date;
    email: string;
    progress: INewHireProcess;
}