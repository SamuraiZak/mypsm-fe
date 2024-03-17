import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant"

export const load = async ({ params }) => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)

    return {
        currentRoleCode,
    }
}