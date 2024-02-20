export const load = async () => {
    const param = {
        pageNum: 1,
        pageSize: 5,
        orderBy: '',
        orderType: 'Descending',
    };

    const dataList = [
        { noPekerja: 28339, name: 'David Beckham', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', status: 'Menunggu Kelulusan Dari Urus Setia' },
        { noPekerja: 28340, name: 'Cristiano Ronaldo', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', status: 'Menunggu Kelulusan Dari Urus Setia' },
        { noPekerja: 28341, name: 'Gareth Bale', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', status: 'Menunggu Kelulusan Dari Urus Setia' },
        { noPekerja: 28342, name: 'Karim Benzema', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', status: 'Menunggu Kelulusan Dari Urus Setia' },
    ];

    return { param, dataList };
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
            { noPekerja: 28339, name: 'David Beckham', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', status: 'Lulus - Urus Setia' },
            { noPekerja: 28340, name: 'Cristiano Ronaldo', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', status: 'Lulus - Urus Setia' },
            { noPekerja: 28341, name: 'Gareth Bale', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', status: 'Lulus - Urus Setia' },
            { noPekerja: 28342, name: 'Karim Benzema', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', status: 'Menunggu Kelulusan Dari Urus Setia' },
            { noPekerja: 28343, name: 'Robin Van Persie', noKadPengenalan: 990122136443, program: '-', skim: '-', gred: '-', status: 'Menunggu Kelulusan Dari Urus Setia' },
        ],
    };

    return {
        param,
        response,
    };
};