export const load = async ({ params }) => {
    const param = {
        pageNum: 1,
        pageSize: 5,
        orderBy: '',
        orderType: 'Descending',
    };

    const dataList = [
        { noPekerja: 28339, name: 'David Beckham', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', namaJawatan: '-', penempatanSekarang: '-' },
        { noPekerja: 28340, name: 'Cristiano Ronaldo', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', namaJawatan: '-', penempatanSekarang: '-' },
        { noPekerja: 28341, name: 'Gareth Bale', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', namaJawatan: '-', penempatanSekarang: '-' },
        { noPekerja: 28342, name: 'Karim Benzema', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', namaJawatan: '-', penempatanSekarang: '-' },
    ];
    const dataList2 = [
        { noPekerja: 'F-6699', name: 'David Villa', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', namaJawatan: '-', penempatanSekarang: '-' },
        { noPekerja: 'F-6700', name: 'Kylian Mbappe', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', namaJawatan: '-', penempatanSekarang: '-' },
        { noPekerja: 'F-6701', name: 'Fabrizio Romano', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', namaJawatan: '-', penempatanSekarang: '-' },
        { noPekerja: 'F-6702', name: 'Peter Cech', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', namaJawatan: '-', penempatanSekarang: '-' },
    ];


    const actingTypes = params.id;
    return {
        dataList, dataList2, param,
        actingTypes
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
