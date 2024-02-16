export const load = async () => {
    const param = {
        pageNum: 1,
        pageSize: 5,
        orderBy: '',
        orderType: 'Descending',
    };

    const dataList = [
        { name: 'calvin' },
        { name: 'didi' },
        { name: 'zulhaimie' },
        { name: 'edwin' },
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
            { name: 'holi' },
            { name: 'hamiz' },
            { name: 'naz' },
            { name: 'azmina' },
        ],
    };

    return {
        param,
        response,
    };
};
