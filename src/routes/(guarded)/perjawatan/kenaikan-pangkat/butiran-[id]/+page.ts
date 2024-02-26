import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant.js';

export const load = async ({ params }) => {

    const param = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
    };

    const dataList = [
        { noPekerja: 28339, name: 'David Beckham', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', namaJawatan: '-', penempatanSekarang: '-', pengisytiharanHarta: '-', akuanPinjamanPendidikan: '-' },
        { noPekerja: 28340, name: 'Cristiano Ronaldo', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', namaJawatan: '-', penempatanSekarang: '-', pengisytiharanHarta: '-', akuanPinjamanPendidikan: '-' },
        { noPekerja: 28341, name: 'Gareth Bale', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', namaJawatan: '-', penempatanSekarang: '-', pengisytiharanHarta: '-', akuanPinjamanPendidikan: '-' },
        { noPekerja: 28342, name: 'Karim Benzema', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', namaJawatan: '-', penempatanSekarang: '-', pengisytiharanHarta: '-', akuanPinjamanPendidikan: '-' },
    ];
    const dataList2 = [
        { noPekerja: 'F-6699', name: 'David Villa', noKadPengenalan: 990122136443, keputusanMesyuarat: 'Sedang Diproses', perakuanUrusSetiaIntegriti: 'Diperakui', perakuanPengarahBahagian: 'Diperakui' },
        { noPekerja: 'F-6700', name: 'Kylian Mbappe', noKadPengenalan: 990122136443, keputusanMesyuarat: 'Sedang Diproses', perakuanUrusSetiaIntegriti: 'Diperakui', perakuanPengarahBahagian: 'Diperakui' },
        { noPekerja: 'F-6701', name: 'Fabrizio Romano', noKadPengenalan: 990122136443, keputusanMesyuarat: 'Sedang Diproses', perakuanUrusSetiaIntegriti: 'Diperakui', perakuanPengarahBahagian: 'Diperakui' },
        { noPekerja: 'F-6702', name: 'Peter Cech', noKadPengenalan: 990122136443, keputusanMesyuarat: 'Sedang Diproses', perakuanUrusSetiaIntegriti: 'Sedang Diproses', perakuanPengarahBahagian: 'Sedang Diproses' },
    ];
    const dataList3 = [
        { noPekerja: 28339, name: 'David Beckham', noKadPengenalan: 990122136443, gred: '-', namaJawatan: '-', penempatanSekarang: '-',},
        { noPekerja: 28340, name: 'Cristiano Ronaldo', noKadPengenalan: 990122136443, gred: '-', namaJawatan: '-', penempatanSekarang: '-',},
        { noPekerja: 28341, name: 'Gareth Bale', noKadPengenalan: 990122136443, gred: '-', namaJawatan: '-', penempatanSekarang: '-',},
    ];
    const dataList4 = [
        { tarikhKuatkuasa: "17/3/2024", gajiSekarang: 'RM 1,932.13', gajiBaru: "-", gred: '-', catatan: 'Gaji Akhir Di Gred Jawatan Asal Sebelum Diberi Pergerakan Gaji',},
        { tarikhKuatkuasa: "18/3/2024", gajiSekarang: 'RM 2,032.13', gajiBaru: "2,254.00", gred: '-', catatan: 'Gaji Sekarang - Diberi 1 KGT RM 100.00 Di Gred E19, Gaji Baru - Diberi Gaji Permulaan Di Gred E22',},
    ];

    const dataList5 = [
        { noPekerja: 28339, name: 'David Beckham', noKadPengenalan: 990122136443, pengesahanUrusSetia: "Sedang Diproses", sokonganPenyokong: "SedangDiproses", kelulusanPelulus: "Sedang Diproses"},
        { noPekerja: 28340, name: 'Cristiano Ronaldo', noKadPengenalan: 990122136443, pengesahanUrusSetia: "Sedang Diproses", sokonganPenyokong: "SedangDiproses", kelulusanPelulus: "Sedang Diproses"},
        { noPekerja: 28341, name: 'Gareth Bale', noKadPengenalan: 990122136443, pengesahanUrusSetia: "Sedang Diproses", sokonganPenyokong: "SedangDiproses", kelulusanPelulus: "Sedang Diproses"},
    ];
    const dataList6 = [
        { noPekerja: 28339, name: 'David Beckham', noKadPengenalan: 990122136443, skim: "tetap", gred: "1-54", penempatanSekarang: "-", status: "Dalam Proses", tindakan: "-"},
        { noPekerja: 28340, name: 'Cristiano Ronaldo', noKadPengenalan: 990122136443, skim: "tetap", gred: "1-54", penempatanSekarang: "-", status: "Diperaku - Urus Setia Integriti", tindakan: "-"},
    ];

    const promotionType = params.id;
    return {
        dataList, dataList2, dataList3, dataList4, dataList5, dataList6, param,
        promotionType
    };

};

export const _updateTable = async (param: unknown) => {
    const response = {
        status: 'success',
        meta: {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        dataList: [
            { noPekerja: 28339, name: 'David Beckham', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', namaJawatan: '-', penempatanSekarang: '-' },
            { noPekerja: 28340, name: 'Cristiano Ronaldo', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', namaJawatan: '-', penempatanSekarang: '-' },
            { noPekerja: 28341, name: 'Gareth Bale', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', namaJawatan: '-', penempatanSekarang: '-' },
            { noPekerja: 28342, name: 'Karim Benzema', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', namaJawatan: '-', penempatanSekarang: '-' },
            { noPekerja: 28343, name: 'Robin Van Persie', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', namaJawatan: '-', penempatanSekarang: '-' },
        ],
    };

    return {
        param,
        response,
    };
};
