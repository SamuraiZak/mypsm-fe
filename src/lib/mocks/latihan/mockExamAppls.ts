import { mockExams } from './mockExams';

export const mockExamAppls: IntExamAppl[] = [
    {
        id: 1,
        candidateEmpNumber: '00001',
        candidate: 'Mohd Irfan bin Abu',
        candidateIdentityNumber: '990909-13-5076',
        candidateGred: 'N19',
        exam: mockExams[0],
        examResult: '-',
        examCertLink: 'download',
        status: 'Baru',
    },
    {
        id: 2,
        candidateEmpNumber: '00001',
        candidate: 'Mohd Irfan bin Abu',
        candidateIdentityNumber: '990909-13-5076',
        candidateGred: 'N19',
        exam: mockExams[1],
        examResult: 'LULUS',
        examCertLink: 'download',
        status: 'Selesai',
    },
    {
        id: 3,
        candidateEmpNumber: '00002',
        candidate: 'Nur Afifah Farhan',
        candidateIdentityNumber: '991129-13-6122',
        candidateGred: 'W22',
        exam: mockExams[1],
        examResult: '-',
        examCertLink: 'download',
        status: 'SAH - Urus Setia Latihan',
    },
];
