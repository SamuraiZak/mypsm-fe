import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant"
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto"

export const load = async ({ params }) => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)

    let param: CommonListRequestDTO = {
        pageNum: 1,
        orderBy: null,
        orderType: null,
        pageSize: 5,
    }

    let otherDetail = [
        { name: "Pinjaman Komputer", jumlah: 325, tarikhMula: '2024-11-22', tarikhTamat: '2025-04-22', jenisBayaran: 'Bulanan'},
        { name: "Kuarters", jumlah: 325, tarikhMula: '2024-11-22', tarikhTamat: '2025-04-22', jenisBayaran: 'Bulanan'},
        { name: "Perubatan", jumlah: 325, tarikhMula: '2024-11-22', tarikhTamat: '2025-04-22', jenisBayaran: 'Bulanan'},
        { name: "Bantuan Pakaian Panas", jumlah: 325, tarikhMula: '2024-11-22', tarikhTamat: '2025-04-22', jenisBayaran: 'Bulanan'},
        { name: "Elaun Memangku", jumlah: 325, tarikhMula: '2024-11-22', tarikhTamat: '2025-04-22', jenisBayaran: 'Bulanan'},
    ]
    let leaveRecord = [
        { jenisCuti: "Pinjaman Komputer", kodCuti: 325, tarikhMohon: '2024-11-22', tarikhAkhir: '2025-04-22', tujuanCuti: 'Sakit', statusCuti: 'Selesai', jumlahHariCuti: 6 },
        { jenisCuti: "Kuarters", kodCuti: 325, tarikhMohon: '2024-11-22', tarikhAkhir: '2025-04-22', tujuanCuti: 'Sakit', statusCuti: 'Selesai', jumlahHariCuti: 6 },
        { jenisCuti: "Perubatan", kodCuti: 325, tarikhMohon: '2024-11-22', tarikhAkhir: '2025-04-22', tujuanCuti: 'Sakit', statusCuti: 'Selesai', jumlahHariCuti: 6 },
    ]
    let actingSchedule = [
        { gred: "E44", iTK: 400, iTP: 400, elaunMemangku: 250},
        { gred: "E38", iTK: 400, iTP: 400, elaunMemangku: 250},
        { gred: "E22", iTK: 400, iTP: 400, elaunMemangku: 250},
    ]

    return {
        currentRoleCode,
        otherDetail,
        leaveRecord,
        param,
        actingSchedule,
    }
}