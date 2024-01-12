

import type { IContractRenewal } from '$lib/interfaces/contract-staffs/IContractRenewal';
import { mockEmployees } from '$lib/mocks/database/mockEmployees.js';

export async function load({ cookies }) {


    const contractRenewalData: IContractRenewal[] = [
        {
            namaKakitangan: mockEmployees[0].name,
            idSementara: mockEmployees[0].employeeNumber,
            noKadPengenalan: mockEmployees[0].identityDocumentNumber,
            emel: 'wee.ting@hrmis.com',
            category: 'Kontrak',
            applicationDate: '2022-12-01',
            hiredDate: '2022-12-05',
            contractExpiryDate: '2023-12-05',
            remainingDaysToContractEnd: '45',
            appraisalSkillMark: '50/100',
            appraisalInterpersonalMark: '25/100',
            appraisalTotalMark: '75/100',
            status: 'Baru',
        },
        {
            namaKakitangan: mockEmployees[1].name,
            idSementara: mockEmployees[1].employeeNumber,
            noKadPengenalan: mockEmployees[1].identityDocumentNumber,
            emel: 'loh@hrmis.com',
            category: 'Kontrak',
            applicationDate: '2022-12-01',
            hiredDate: '2022-12-05',
            contractExpiryDate: '2023-12-05',
            remainingDaysToContractEnd: '45',
            appraisalSkillMark: '50/100',
            appraisalInterpersonalMark: '25/100',
            appraisalTotalMark: '75/100',
            status: 'Baru',
        },
        {
            namaKakitangan: mockEmployees[2].name,
            idSementara: mockEmployees[2].employeeNumber,
            noKadPengenalan: mockEmployees[2].identityDocumentNumber,
            emel: 'ali.abu@hrmis.com',
            category: 'Kontrak',
            applicationDate: '2022-12-01',
            hiredDate: '2022-12-05',
            contractExpiryDate: '2023-12-05',
            remainingDaysToContractEnd: '45',
            appraisalSkillMark: '50/100',
            appraisalInterpersonalMark: '25/100',
            appraisalTotalMark: '75/100',
            status: 'Baru',
        },
    ];

    const newHireData = [
        {
            namaKakitangan: 'Wee Ting',
            idSementara: '01288',
            noKadPengenalan: '889955-11-2244',
            emel: 'wee.ting@hrmis.com',
            category: 'Kontrak',
            applicationDate: '2022-12-01',
            hiredDate: '2022-12-05',
            contractExpiryDate: '2023-12-05',
            remainingDaysToContractEnd: '45',
        },
        {
            namaKakitangan: 'Loh Huat Tang',
            idSementara: '01254',
            noKadPengenalan: '589955-11-1232',
            emel: 'loh@hrmis.com',
            category: 'Kontrak',
            applicationDate: '2022-12-01',
            hiredDate: '2022-12-05',
            contractExpiryDate: '2023-12-05',
            remainingDaysToContractEnd: '45',
        },
        {
            namaKakitangan: 'Ali Bin Abu',
            idSementara: '01212',
            noKadPengenalan: '789955-11-5542',
            emel: 'ali.abu@hrmis.com',
            category: 'Kontrak',
            applicationDate: '2022-12-01',
            hiredDate: '2022-12-05',
            contractExpiryDate: '2023-12-05',
            remainingDaysToContractEnd: '45',
        },
    ];

    const userId = cookies.get('userId');

    return {
        props: {
            newHireLists: newHireData,
            candidateLists: contractRenewalData,
        },
        userId,
    };
}
