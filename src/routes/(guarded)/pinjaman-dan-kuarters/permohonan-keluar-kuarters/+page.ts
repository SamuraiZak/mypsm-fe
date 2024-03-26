import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant"
import { UserRoleConstant } from "$lib/constants/core/user-role.constant"
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto"

export const load = async () => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    let dataList: any = [];


    let param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: {}
    }
    if (currentRoleCode === UserRoleConstant.urusSetiaPeringkatNegeri.code) {
        dataList = [
            { id: 1, noPemohon: "K204", namaPemohon: "Florence Lo", noKadPengenalan: "990011135664", jenisPemohon: "Kakitangan LKIM", tarikhMemohon: "2022-04-22", status: "Baru", ulasan: "Menunggu Keputusan Urus Setia" },
            { id: 2, noPemohon: "K404", namaPemohon: "Kim Ji Won", noKadPengenalan: "990011135664", jenisPemohon: "Agensi/Jabatan Luar", tarikhMemohon: "2020-04-22", status: "Selesai", ulasan: "Diluluskan" }
        ]
    } else if (currentRoleCode === UserRoleConstant.kakitangan.code) {
        dataList = [
            { id: 1, noPemohon: "K204", namaPemohon: "Florence Lo", noKadPengenalan: "990011135664", jenisPemohon: "Kakitangan LKIM", tarikhMemohon: "2022-04-22", status: "Baru", ulasan: "Menunggu Keputusan Urus Setia" },
        ]
    }

    return {
        currentRoleCode,
        param,
        dataList,
    }
}
