import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant"
import { UserRoleConstant } from "$lib/constants/core/user-role.constant"
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto"
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto"
import type { MovingInKuarters } from "$lib/dto/mypsm/pinjaman/kuarters/moving-in-list.dto"
import { QuartersServices } from "$lib/services/implementation/mypsm/pinjaman-kuarters/quarters.service"

export const load = async () => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    let quartersList: MovingInKuarters[] = [];
    let quartersListResponse: CommonResponseDTO = {};
    let dataList: any = [];


    let param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: "id",
        orderType: 1,
        filter: {}
    }
    // if (currentRoleCode === UserRoleConstant.urusSetiaPeringkatNegeri.code) {
    //     dataList = [
    //         { id: 1, noPemohon: "K204", namaPemohon: "John K.", noKadPengenalan: "990011135667", jenisPemohon: "Kakitangan LKIM", tarikhMohon: "2024-04-22", status: "Baru", ulasan: "Menunggu Keputusan Urus Setia" },
    //         { id: 2, noPemohon: "K404", namaPemohon: "John C.", noKadPengenalan: "990011135667", jenisPemohon: "Agensi/Jabatan Luar", tarikhMohon: "2024-04-22", status: "Selesai", ulasan: "Diluluskan" }
    //     ]
    // } else if (currentRoleCode === UserRoleConstant.kakitangan.code) {
        quartersListResponse =
            await QuartersServices.getMovingInList(param);
        quartersList =
            quartersListResponse.data?.dataList as MovingInKuarters[];
    // }

    return {
        currentRoleCode,
        param,
        dataList,
        quartersListResponse,
        quartersList,
    }
}   

export const _applyQuarters = async () => {
    const response: CommonResponseDTO = 
        await QuartersServices.addMovingInApplication();
    
    if(response.status == "success"){
        return { response }
    } else {
        new Error('Failed to create new application.')
    }
}