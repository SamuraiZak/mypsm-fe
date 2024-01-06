import { mockEmployees } from "$lib/mocks/database/mockEmployees";

export const staffs = [
    {
        noPekerja: mockEmployees[0].employeeNumber,
        namaPekerja: mockEmployees[0].name,
        noKadPengenalan: mockEmployees[0].identityDocumentNumber,
        gred: 'E22',
        jawatan: 'Akauntan',
        tarafPendidikan: 'Ijazah Sarjana Muda',
        kelayakanCuti: 30,
    },
    {
        noPekerja: mockEmployees[1].employeeNumber,
        namaPekerja: mockEmployees[1].name,
        noKadPengenalan: mockEmployees[1].identityDocumentNumber,
        gred: 'E22',
        jawatan: 'Penolong Akauntan',
        tarafPendidikan: 'Ijazah Sarjana Muda',
        kelayakanCuti: 30,
    },
    {
        noPekerja: mockEmployees[2].employeeNumber,
        namaPekerja: mockEmployees[2].name,
        noKadPengenalan: mockEmployees[2].identityDocumentNumber,
        gred: 'E29',
        jawatan: 'Penolong Akauntan',
        tarafPendidikan: 'Ijazah Sarjana Muda',
        kelayakanCuti: 30,
    },
    {
        noPekerja: '5627',
        namaKakitangan: 'Nur Aisah',
        noKadPengenalan: '980521-12-1234',
        gred: 'E19',
        jawatan: 'Kontraktor',
        tarafPendidikan: 'Ijazah Sarjana Muda',
        kelayakanCuti: 30,
    },
];
