import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant"
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto"

export const load = async () => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)

    let param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: {}
    }
    let dataList = [
        { id: 1, noPekerja: "0122", namaPegawai: "Ali bin Ahmad", kadPengenalan: "951122135223", gajiPokok: 5234, elaun: 155, penolakanGaji: 35, jenisPersaraan: "Paksa", status: "Baru" },
        { id: 2, noPekerja: "0123", namaPegawai: "Ali bin Abu", kadPengenalan: "951122135223", gajiPokok: 5234, elaun: 155, penolakanGaji: 35, jenisPersaraan: "Terbitan", status: "Selesai" }
    ]
    return {
        currentRoleCode,
        param,
        dataList,
    }
}