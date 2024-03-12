import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";

export const load = async () => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    const param = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
    };

    const dataList = [
        { id: 1, kodKlinik: 28341, namaKlinik: 'Klinik Wee', negeri: 'Selangor', bulan: 'Mei 2026', tarikhDilantik: '2023-11-01', tarikhTamat: '2024-06-30', jumlahTuntutanKeseluruhan: '5,000.00', jumlahTuntutanTahunSemasa: 'Tiada', status: 'Baru', },
        { id: 2, kodKlinik: 28342, namaKlinik: 'Klinik Loh', negeri: 'Sarawak', bulan: 'Mei 2026', tarikhDilantik: '2023-11-01', tarikhTamat: '2024-06-30', jumlahTuntutanKeseluruhan: '5,000.00', jumlahTuntutanTahunSemasa: 'Tiada', status: 'Disokong', },
        { id: 2, kodKlinik: 28342, namaKlinik: 'Klinik Haiwan', negeri: 'Kelantan', bulan: 'Mei 2026', tarikhDilantik: '2023-11-01', tarikhTamat: '2024-06-30', jumlahTuntutanKeseluruhan: '5,000.00', jumlahTuntutanTahunSemasa: 'Tiada', status: 'Disokong', },
    ];

    return {
        currentRoleCode,
        param,
        dataList,
    }
}