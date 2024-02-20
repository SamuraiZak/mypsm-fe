export const load = async () => {
    const param = {
        pageNum: 1,
        pageSize: 5,
        orderBy: '',
        orderType: 'Descending',
    };

    const dataList = [
        { idPemangkuan: 'PMGK-1234', tarikhTawaran: '19/02/2024', gred: 'N32', position: 'Setiausaha Pejabat', keputusanPemangkuan: 'Belum Dikemaskini' },
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
            { idPemangkuan: 'PMGK-1234', tarikhTawaran: '19/02/2024', gred: 'N32', position: 'Setiausaha Pejabat', keputusanPemangkuan: 'Berjaya' },
        ],
    };

    return {
        param,
        response,
    };
};