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
        { id: 1, kodKlinik: 28341, namaKlinik: 'Klinik Wee', negeri: 'Selangor', tarikhDimohon: '2023-10-26', tarikhDilantik: '2023-11-01', tarikhTamat: '2024-06-30', tempoh: 1, status: 'Baru', tindakan: 'Tiada'},
        { id: 2, kodKlinik: 28342, namaKlinik: 'Klinik Loh', negeri: 'Sarawak', tarikhDimohon: '2023-10-26', tarikhDilantik: '2023-11-01', tarikhTamat: '2024-06-30', tempoh: 2, status: 'Disokong', tindakan: 'Tiada'},
        { id: 2, kodKlinik: 28342, namaKlinik: 'Klinik Haiwan', negeri: 'Kelantan', tarikhDimohon: '2023-10-26', tarikhDilantik: '2023-11-01', tarikhTamat: '2024-06-30', tempoh: 4, status: 'Disokong', tindakan: 'Tiada'},
    ];

    return {
        currentRoleCode,
        param,
        dataList,
    }
}