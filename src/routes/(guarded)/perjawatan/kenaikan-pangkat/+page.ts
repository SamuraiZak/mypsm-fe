export const load = async () => {
    const param = {
        pageNum: 1,
        pageSize: 5,
        orderBy: '',
        orderType: 'Descending',
    };

    const dataList = [
        {group: 'P1234', date: '20/02/2024', jumlahCalon: 5, status: 'Draf'},
        {group: 'P1235', date: '20/02/2024', jumlahCalon: 10, status: 'Draf'},
    ]

    const dataList2 = [
        { noPekerja: 28339, name: 'David Beckham', noKadPengenalan: 990122136443, skim: 'Tetap', gred: 'Gred 1-54', status: 'Menunggu Pengesahan - Urus Setia', tindakan: '-' },
        { noPekerja: 28340, name: 'Cristiano Ronaldo', noKadPengenalan: 990122136443, skim: 'Tetap', gred: '-Gred 1-54', status: 'Menunggu Pengesahan - Urus Setia', tindakan: '-' },
        { noPekerja: 28341, name: 'Gareth Bale', noKadPengenalan: 990122136443, skim: 'Tetap', gred: 'Gred 1-54', status: 'Menunggu Pengesahan - Urus Setia', tindakan: '-' },
        { noPekerja: 28342, name: 'Karim Benzema', noKadPengenalan: 990122136443, skim: 'Sementara', gred: 'Gred 1-54', status: 'Menunggu Pengesahan - Urus Setia', tindakan: '-' },
    ];
    return { param, dataList, dataList2 };
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
            { noPekerja: 28339, name: 'David Beckham', noKadPengenalan: 990122136443, skim: 'Tetap', gred: 'Gred 1-54', status: 'SAH - Urus Setia', tindakan: '-' },
            { noPekerja: 28340, name: 'Cristiano Ronaldo', noKadPengenalan: 990122136443, skim: 'Tetap', gred: 'Gred 1-54', status: 'SAH - Urus Setia', tindakan: '-' },
            { noPekerja: 28341, name: 'Gareth Bale', noKadPengenalan: 990122136443, skim: 'Tetap', gred: 'Gred 1-54', status: 'SAH - Urus Setia', tindakan: '-' },
            { noPekerja: 28342, name: 'Karim Benzema', noKadPengenalan: 990122136443, skim: 'Sementara', gred: 'Gred 1-54', status: 'Menunggu Kelulusan Dari Urus Setia', tindakan: '-' },
            { noPekerja: 28343, name: 'Robin Van Persie', noKadPengenalan: 990122136443, skim: 'Sementara', gred: 'Gred 1-54', status: 'Menunggu Kelulusan Dari Urus Setia', tindakan: '-' },
        ],
    };

    return {
        param,
        response,
    };
};