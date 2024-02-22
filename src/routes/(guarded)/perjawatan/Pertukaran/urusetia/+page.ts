export const load = async () => {
    const param = {
        pageNum: 1,
        pageSize: 5,
        orderBy: '',
        orderType: 'Descending',
    };

    const dataList = [
        { IdPermohonan:'0001', JenisPertukaran: 'Pertukaran Dalam Ibu pejabat', TarikhPermohonan:'10/12/2023', KeputusanPermohonan:'Sedang Diproses',  },
        
       
    ];
    const dataList2 = [
        { IdPermohonan:'0002', JenisPertukaran: 'Pertukaran Dalam Ibu pejabat', TarikhPermohonan:'11/12/2023', KeputusanPermohonan:'Sedang Diproses',  },
       
    ];
    const dataList3 = [
        { IdPermohonan:'0003', JenisPertukaran: 'Pertukaran Dalam Ibu pejabat', TarikhPermohonan:'12/12/2023', KeputusanPermohonan:'Sedang Diproses',  },
       
    ];


    return { param, dataList,dataList2,dataList3};
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
            { IdPermohonan:'0001', JenisPertukaran: 'Pertukaran Dalam Ibu pejabat', TarikhPermohonan:'10/12/2023', KeputusanPermohonan:'Sedang Diproses',  },
    
        ],

        dataList2: [
            { IdPermohonan:'0002', JenisPertukaran: 'Pertukaran Dalam Ibu pejabat', TarikhPermohonan:'10/12/2023', KeputusanPermohonan:'Sedang Diproses',  },
        
        ],
        dataList3: [
            { IdPermohonan:'0002', JenisPertukaran: 'Pertukaran Dalam Ibu pejabat', TarikhPermohonan:'10/12/2023', KeputusanPermohonan:'Sedang Diproses',  },
        
        ],
    };

    return {
        param,
        response,
    };
};
