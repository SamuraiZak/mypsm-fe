import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import type { RadioDTO } from "$lib/dto/core/radio/radio.dto";

export const load = async ({params}) => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    const isViewOnly: boolean = getViewType(params.id)

    const lookup = getLookup();

    return {
        currentRoleCode,
        lookup,
        isViewOnly,
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

const getViewType = (viewType: string) => {
    if(viewType === "baru")
        return false
    else
        return true
}