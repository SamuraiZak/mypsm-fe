

import { mockEmployees } from '$lib/mocks/database/mockEmployees.js';

export async function load() {


    const candidateData: Candidate[] = [
        {
            namaKakitangan: 'Wee Ting',
            idSementara: '01288',
            noKadPengenalan: '889955-11-2244',
            emel: 'wee.ting@hrmis.com',
            pautan: 'https://www.myPSM.com.gov.my/lantikan-baru/kontrak/daftar-xyshskai.cosjk.mypsm.com',
        },
        {
            namaKakitangan: 'Loh Huat Tang',
            idSementara: '01254',
            noKadPengenalan: '589955-11-1232',
            emel: 'loh@hrmis.com',
            pautan: 'https://www.myPSM.com.gov.my/lantikan-baru/kontrak/daftar-xyshskai.cosjk.mypsm.com',
        },
        {
            namaKakitangan: 'Ali Bin Abu',
            idSementara: '01212',
            noKadPengenalan: '789955-11-5542',
            emel: 'ali.abu@hrmis.com',
            pautan: 'https://www.myPSM.com.gov.my/lantikan-baru/kontrak/daftar-xyshskai.cosjk.mypsm.com',
        },
    ];

    const newHireData: NewHire[] = [
        {
            namaKakitangan: mockEmployees[0].name,
            idSementara: mockEmployees[0].employeeNumber,
            noKadPengenalan: mockEmployees[0].identityDocumentNumber,
            kategori: 'Tetap',
            TarikhMohon: '23-08-2023',
            TarikLantikan: '',
            TarikhBersara: '',
            emel: 'wee.ting@hrmis.com',
            status: 'Baru',
        },
        {
            namaKakitangan: mockEmployees[1].name,
            idSementara: mockEmployees[1].employeeNumber,
            noKadPengenalan: mockEmployees[1].identityDocumentNumber,
            kategori: 'Tetap',
            TarikhMohon: '20-07-2023',
            TarikLantikan: '',
            TarikhBersara: '',
            emel: 'loh@hrmis.com',
            status: 'SAH - Urusetia Perjawatan',
        },
        {
            namaKakitangan: mockEmployees[2].name,
            idSementara: mockEmployees[2].employeeNumber,
            noKadPengenalan: mockEmployees[2].identityDocumentNumber,
            kategori: 'Tetap',
            TarikhMohon: '12-07-2023',
            TarikLantikan: '23-11-2023',
            TarikhBersara: '23-08-2056',
            emel: 'ali.abu@hrmis.com',
            status: 'LULUS - Pelulus',
        },
    ];



    return {
        props: {
            newHireLists: newHireData,
            candidateLists: candidateData,
        },

    };
}
