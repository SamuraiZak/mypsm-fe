export const load = async () => {
    const param = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
    };

    const dataList = [
        { noPekerja: 28339, name: 'David Beckham', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', namaJawatan: '-', penempatanSekarang: '-', pengisytiahranHarta: '-', akuanPinjamanPendidikan: '-' },
        { noPekerja: 28340, name: 'Cristiano Ronaldo', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', namaJawatan: '-', penempatanSekarang: '-', pengisytiahranHarta: '-', akuanPinjamanPendidikan: '-' },
        { noPekerja: 28341, name: 'Gareth Bale', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', namaJawatan: '-', penempatanSekarang: '-', pengisytiahranHarta: '-', akuanPinjamanPendidikan: '-' },
        { noPekerja: 28342, name: 'Karim Benzema', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', namaJawatan: '-', penempatanSekarang: '-', pengisytiahranHarta: '-', akuanPinjamanPendidikan: '-' },
    ];

    //5th Stepper
    const dataList2 = [
        { noPekerja: 28339, name: 'David Beckham', noKadPengenalan: 990122136443, suratSetujuTerima: '-', borangLaporDiri: '-', notaSerahTugas: '-', keputusanPemangkuanKakitangan: '-'},
        { noPekerja: 28340, name: 'Cristiano Ronaldo', noKadPengenalan: 990122136443, suratSetujuTerima: '-', borangLaporDiri: '-', notaSerahTugas: '-', keputusanPemangkuanKakitangan: '-'},
    ];

    const dataList3 = [
        { noPekerja: 28339, name: 'David Beckham', noKadPengenalan: 990122136443, gred: '-', namaJawatan: '-', penempatanSekarang: 'Bahagian Teknologi', permohonanPindaanPenempatan: 'Ada', keputusanPermohonanPindaanPenempatan: 'Lulus'},
        { noPekerja: 28340, name: 'Cristiano Ronaldo', noKadPengenalan: 990122136443, gred: '-', namaJawatan: '-', penempatanSekarang: '-', permohonanPindaanPenempatan: 'Ada', keputusanPermohonanPindaanPenempatan: 'Lulus'},
        { noPekerja: 28340, name: 'Kylian Mbapper', noKadPengenalan: 990122136443, gred: '-', namaJawatan: '-', penempatanSekarang: 'Bahagian Sains', permohonanPindaanPenempatan: 'Ada', keputusanPermohonanPindaanPenempatan: 'Lulus'},
    ];

    return {
        dataList, dataList2, dataList3, param,
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
            { noPekerja: 28339, name: 'David Beckham', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', namaJawatan: '-', penempatanSekarang: '-', pengisytiahranHarta: '-', akuanPinjamanPendidikan: '-' },
            { noPekerja: 28340, name: 'Cristiano Ronaldo', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', namaJawatan: '-', penempatanSekarang: '-', pengisytiahranHarta: '-', akuanPinjamanPendidikan: '-' },
            { noPekerja: 28341, name: 'Gareth Bale', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', namaJawatan: '-', penempatanSekarang: '-', pengisytiahranHarta: '-', akuanPinjamanPendidikan: '-' },
            { noPekerja: 28342, name: 'Karim Benzema', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', namaJawatan: '-', penempatanSekarang: '-', pengisytiahranHarta: '-', akuanPinjamanPendidikan: '-' },
            { noPekerja: 28343, name: 'Robin Van Persie', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', namaJawatan: '-', penempatanSekarang: '-', pengisytiahranHarta: '-', akuanPinjamanPendidikan: '-' },
        ],
    };

    return {
        param,
        response,
    };
};
