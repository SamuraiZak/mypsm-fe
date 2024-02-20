export const load = async () => {
    const param = {
        pageNum: 1,
        pageSize: 5,
        orderBy: '',
        orderType: 'Descending',
    };

    const dataList = [
        { id:'0003', name: 'zulhaimie' , noKadPengenalan:'777777777777', Kategori:'Tetap', tarikhMemohon:'30/2/2024', status:' SOkONG-Penyokong', TindakanUlasan:'' },
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
            { id:'0001', name: 'holi', noKadPengenalan:'999999999999', Kategori:'Tetap', tarikhMemohon:'30/2/2024', status:' SOkONG-Penyokong', TindakanUlasan:''  },

      
        ],
    };

    return {
        param,
        response,
    };
};
