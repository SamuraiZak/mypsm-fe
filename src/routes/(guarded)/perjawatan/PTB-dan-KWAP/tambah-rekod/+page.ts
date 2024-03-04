export const load = async () => {
    const param = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
    };

    const dataList = [
        { id:'0001', name: 'Calvin', noKadPengenalan:'999999999999', Kategori:'Tetap', tarikhMemohon:'30/2/2024', status: 'baru', Tindakan:'-'},
        { id:'0002', name: 'Fidi', noKadPengenalan:'888888888888', Kategori:'Tetap', tarikhMemohon:'30/2/2024', status: 'baru', Tindakan:'-'},
        { id:'0003', name: 'Zulhaimie', noKadPengenalan:'777777777777', Kategori:'Tetap', tarikhMemohon:'30/2/2024', status: 'baru', Tindakan:'-'},
        { id:'0004', name: 'Edwin', noKadPengenalan:'666666666666', Kategori:'Tetap', tarikhMemohon:'30/2/2024', status: 'baru', Tindakan:'-'},
    ];
    const dataList2 = [
        { id:'0004', name: 'Edwin', noKadPengenalan:'666666666666', Kategori:'Tetap', tarikhMemohon:'30/2/2024', status: 'baru', Tindakan:'-'},
       
    ];

    return { param, dataList,dataList2 };
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
            { id:'0001', name: 'holi', noKadPengenalan:'999999999999', Kategori:'Tetap', tarikhMemohon:'30/2/2024', status: 'baru', Tindakan:'-'},
            { id:'0002', name: 'hamiz', noKadPengenalan:'888888888888', Kategori:'Tetap', tarikhMemohon:'30/2/2024', status: 'baru', Tindakan:'-'},
            { id:'0003', name: 'naz' , noKadPengenalan:'777777777777', Kategori:'Tetap', tarikhMemohon:'30/2/2024', status: 'baru', Tindakan:'-'},
            { id:'0004', name: 'azmina', noKadPengenalan:'666666666666', Kategori:'Tetap', tarikhMemohon:'30/2/2024', status: 'baru', Tindakan:'-'},
      
        ],
        dataList2: [
            { id:'0004', name: 'Edwin', noKadPengenalan:'666666666666', Kategori:'Tetap', tarikhMemohon:'30/2/2024', status: 'baru', Tindakan:'-'},
      
        ],
    };

    return {
        param,
        response,
    };
};
