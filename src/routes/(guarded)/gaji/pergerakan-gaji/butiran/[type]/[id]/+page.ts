import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant"
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";

export const load = async ({params}) => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    let salaryType: any = params.type

    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: {
            program: "TETAP",
            employeeNumber: null,
            name: null,
            identityDocumentNumber: null,
            scheme: null,
            grade: null,
            position: null
        },
    }

    let mockData = [
        { noPekerja: '2821', nama: 'Ali bin Abu', noIC: '990812091927', gred: "E54", bulanPergerakanGaji: 'Januari', KGT: 280.00, gajiSemasa: 6541.97, eWSemasa: 6541.97, eLKritikal: 6541.97, gajiBaru: 6541.97, eWBaru: 6541.97, eLKritikalBaru: 6541.97, kGTKhas: 100.00, gajiKhas: 6541.97, eWKhas: '-', bantuanKhas: '-',tindakanTatatertib: 'Ada', catatan: '-'},
        { noPekerja: '2873', nama: 'Jichael Mackson', noIC: '990812091927', gred: "E54", bulanPergerakanGaji: 'Januari', KGT: 280.00, gajiSemasa: 6123.65, eWSemasa: 6123.65, eLKritikal: 6123.65, gajiBaru: 6123.65, eWBaru: 6123.65, eLKritikalBaru: 6123.65, kGTKhas: 100.00, gajiKhas: 6541.97, eWKhas: '-', bantuanKhas: '-',tindakanTatatertib: 'Tiada', catatan: '-'},
        { noPekerja: '2910', nama: 'Mionel Lessi', noIC: '990812091927', gred: "E54", bulanPergerakanGaji: 'Januari', KGT: 280.00, gajiSemasa: 6344.44, eWSemasa: 6344.44, eLKritikal: 6344.44, gajiBaru: 6344.44, eWBaru: 6344.44, eLKritikalBaru: 6344.44, kGTKhas: 100.00, gajiKhas: 6541.97, eWKhas: '-', bantuanKhas: '-',tindakanTatatertib: 'Tiada', catatan: '-'},
    ]

    return {
        props: {
            currentRoleCode,
            mockData,
            param,
            salaryType,
        }
    }
}