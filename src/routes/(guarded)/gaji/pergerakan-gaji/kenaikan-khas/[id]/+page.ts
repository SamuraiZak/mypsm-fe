import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant"
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";

export const load = async () => {
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
        { kumpulanPGT: 'Kumpulan 12', namaDanBilMesyuarat: 'Mesyuarat 1/02', jenisPergerakanGaji: 'Kenaikan Gaji Tahunan', jumlahKakitangan: 561, bulanPergerakanGaji: 'Januari', tahun: 2024, tarikhMesyuarat: '2/2/2024', status: 'Baru' },
        { kumpulanPGT: 'Kumpulan 13', namaDanBilMesyuarat: 'Mesyuarat 1/02', jenisPergerakanGaji: 'Kenaikan Khas', jumlahKakitangan: 2861, bulanPergerakanGaji: 'Januari', tahun: 2024, tarikhMesyuarat: '2/2/2024', status: 'Dalam Proses' },
        { kumpulanPGT: 'Kumpulan 14', namaDanBilMesyuarat: 'Mesyuarat 1/02', jenisPergerakanGaji: 'Bantuan Khas Kewangan', jumlahKakitangan: 2861, bulanPergerakanGaji: 'Januari', tahun: 2024, tarikhMesyuarat: '2/2/2024', status: 'Selesai' },
    ]

    return {
        props: {
            currentRoleCode,
            mockData,
            param,
        }
    }
}