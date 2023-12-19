import { mockCalonPemangkuanList } from './senaraiCalonPemangkuan';

export const mockPemangkuanList: Pemangkuan[] = [
    {
        idPemangkuan: 'PMG-1234',
        jenisPemangkuan: 'Gred 1-54',
        tarikhRekod: '10/10/2023',
        jumlahCalon: mockCalonPemangkuanList.filter(
            (item) => item.idPemangkuan == 'PMG-1234',
        ).length,
        statusPerlaksanaan: 'Sedang Diproses',
    },
    {
        idPemangkuan: 'PMG-2456',
        jenisPemangkuan: 'Gred 1-54',
        tarikhRekod: '15/10/2023',
        jumlahCalon: mockCalonPemangkuanList.filter(
            (item) => item.idPemangkuan == 'PMG-2456',
        ).length,
        statusPerlaksanaan: 'Sedang Diproses',
    },
    {
        idPemangkuan: 'PMG-4432',
        jenisPemangkuan: 'Gred Flexi 41',
        tarikhRekod: '15/10/2023',
        jumlahCalon: mockCalonPemangkuanList.filter(
            (item) => item.idPemangkuan == 'PMG-4432',
        ).length,
        statusPerlaksanaan: 'Sedang Diproses',
    },
    {
        idPemangkuan: 'PMG-5076',
        jenisPemangkuan: 'Gred Utama',
        tarikhRekod: '15/10/2023',
        jumlahCalon: mockCalonPemangkuanList.filter(
            (item) => item.idPemangkuan == 'PMG-5076',
        ).length,
        statusPerlaksanaan: 'Sedang Diproses',
    },
];
