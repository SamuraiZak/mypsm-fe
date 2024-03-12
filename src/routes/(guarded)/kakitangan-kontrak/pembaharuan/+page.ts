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
        { id: 1, noPekerja: 28341, name: 'Gareth Bale', noKadPengenalan: 990122136443, kategori: 'Kontrak', tarikhMohon: '2023-10-26', tarikhLantikan: '2023-11-01', tarikTamatKontrak: '2024-06-30', hariSehinggaTamatKontrak: 56, markahAspekPengetahuan: 30, markahAspekKualitiPeribadi: 25, markahKeseluruhan: 75, status: "Lulus - Pelulus" },
        { id: 2, noPekerja: 28342, name: 'Cristiano Ronaldo', noKadPengenalan: 990122136443, kategori: 'Kontrak', tarikhMohon: '2023-10-26', tarikhLantikan: '2023-11-01', tarikTamatKontrak: '2024-06-30', hariSehinggaTamatKontrak: 56, markahAspekPengetahuan: 35, markahAspekKualitiPeribadi: 33, markahKeseluruhan: 81, status: "Selesai" },
        { id: 3, noPekerja: 28343, name: 'Toni Kroos', noKadPengenalan: 990122136443, kategori: 'Kontrak', tarikhMohon: '2023-10-26', tarikhLantikan: '2023-11-01', tarikTamatKontrak: '2024-06-30', hariSehinggaTamatKontrak: 56, markahAspekPengetahuan: 45, markahAspekKualitiPeribadi: 31, markahKeseluruhan: 92, status: "Semak" },
    ];

    return {
        currentRoleCode,
        param,
        dataList,
    }
}