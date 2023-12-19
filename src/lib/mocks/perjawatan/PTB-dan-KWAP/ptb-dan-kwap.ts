import { mockEmployees } from '$lib/mocks/database/mockEmployees';
import { status } from '$lib/mocks/status/status';

export const mockPTBdanKWAP: PtbAndKwap[] = [
    {
        noPekerja: mockEmployees[0].employeeNumber,
        namaPekerja: mockEmployees[0].name,
        noKadPengenalan: mockEmployees[0].identityDocumentNumber,
        kategori: 'Tetap',
        tarikhMohon: '12/02/2023',
        status: status[1].name,
        tindakanUlasan: '',
    },
    {
        noPekerja: mockEmployees[1].employeeNumber,
        namaPekerja: mockEmployees[1].name,
        noKadPengenalan: mockEmployees[1].identityDocumentNumber,
        kategori: 'Tetap',
        tarikhMohon: '12/02/2023',
        status: status[2].name,
        tindakanUlasan: '',
    },
    {
        noPekerja: mockEmployees[2].employeeNumber,
        namaPekerja: mockEmployees[2].name,
        noKadPengenalan: mockEmployees[2].identityDocumentNumber,
        kategori: 'Tetap',
        tarikhMohon: '12/02/2023',
        status: status[3].name,
        tindakanUlasan: '',
    },
];
