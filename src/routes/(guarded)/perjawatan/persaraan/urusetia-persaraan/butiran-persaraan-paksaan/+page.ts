export const load = async () => {
    const param = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
    };

    const dataList = [
        { tarikhMula:'20/05/2023', NoPekerja: '23351', NamaPekerja:'Mohd Irfan bin Abu', Status:'Hukuman',  },
        
       
    ];
    


    return { param, dataList};
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
            { tarikhMula:'20/05/2023', NoPekerja: '23351', NamaPekerja:'Mohd Irfan bin Abu', Status:'Hukuman',  },
    
        ],

       
    };

    return {
        param,
        response,
    };
};
