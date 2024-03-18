import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import type { RadioDTO } from "$lib/dto/core/radio/radio.dto";

export const load = async ({params}) => {
    const currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    const lookup = getLookup();

    const param = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
    };
    const dataList = [
        { namaPesakit: "Siti Aminah", noKadPengenalan: "910822032872", rawatan: ["Batuk" ,"Selesema"], hubungan: "Isteri", jumlah: "10000"}
    ]

    return {
        currentRoleCode,
        lookup,
        param,
        dataList,
    }
}

const getLookup = () => {
    const verifyOption: RadioDTO[] = [
        { name: "Sah", value: true },
        { name: "Tidak Sah", value: false }
    ]
    const supportOption: RadioDTO[] = [
        { name: "Sokong", value: true },
        { name: "Tidak Sokong", value: false }
    ]
    const approveOption: RadioDTO[] = [
        { name: "Lulus", value: true },
        { name: "Tidak Lulus", value: false }
    ]

    return {
        verifyOption,
        supportOption,
        approveOption,
    }
}
