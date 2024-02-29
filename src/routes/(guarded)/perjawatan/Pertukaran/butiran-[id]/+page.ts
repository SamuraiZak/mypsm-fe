import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";

export const load = async ({params}) => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    const param = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
    };

    let dataList;

    const detail= params.id 
return { param, detail };
};