import { mockActingIndividual } from './mockActingIndividual';

export const mockActingBatch: IntActingBatch[] = [
    {
        batchId: 1,
        type: 'Gred 1-54',
        date: '29/09/2023',
        candidateCount: mockActingIndividual.filter((item) => item.batchId == 1)
            .length,
        status: 'Sedang Diproses',
    },
    {
        batchId: 2,
        type: 'Gred 1-54',
        date: '29/09/2023',
        candidateCount: mockActingIndividual.filter((item) => item.batchId == 2)
            .length,
        status: 'Sedang Diproses',
    },
    {
        batchId: 3,
        type: 'Gred Flexi 41',
        date: '29/09/2023',
        candidateCount: mockActingIndividual.filter((item) => item.batchId == 3)
            .length,
        status: 'Sedang Diproses',
    },
    {
        batchId: 4,
        type: 'Gred Utama',
        date: '29/09/2023',
        candidateCount: mockActingIndividual.filter((item) => item.batchId == 4)
            .length,
        status: 'Sedang Diproses',
    },
];
