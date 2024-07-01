import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant"
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";

export const load = async ({}) => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)

    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: {
            program: "TETAP",
            employeeNumber: null,
            name: null,
            identityCard: null,
            scheme: null,
            grade: null,
            position: null
        },
    }

    let mockData = [
        { label: 'ITKA', total: 210.77},
        { label: 'ITP', total: 30.10},
        { label: 'EW', total: 5.50},
        { label: 'Elaun JUSA', total: 23.00},
    ]
    let mockData2 = [
        { label: 'Koop Kerajaan Sabah', total: 50.00},
        { label: 'Pinjaman Kenderaan', total: 364.01},
        { label: 'Kelab LKIM Sabah', total: 40.10},
    ]

    return {
        props: {
            currentRoleCode,
            mockData,
            mockData2,
            param,
        }
    }
}