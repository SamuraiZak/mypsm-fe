export const load = async () => {
    const param = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
    };

    const dataList = [
        { id:'0001', noPekerja: '123456', namaKakitangan:'Mohd Irfan bin Abu', noKP:'999999999999', tarikhMemohon:'30/2/2024',keputusan:'GAGAL', status: 'Selesai', },
        
    ];
    const dataList2 = [
        { id:'0001', noPekerja: '123456', namaKakitangan:'Mohd Irfan bin Abu', noKP:'999999999999', tarikhMemohon:'30/2/2024',keputusan:'GAGAL', status: 'Selesai', },
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
            { id:'0001', noPekerja: '123456', namaKakitangan:'Mohd Irfan bin Abu', noKP:'999999999999', tarikhMemohon:'30/2/2024',keputusan:'GAGAL', status: 'Selesai', },
      
        ],
        dataList2: [
            { id:'0001', noPekerja: '123456', namaKakitangan:'Mohd Irfan bin Abu', noKP:'999999999999', tarikhMemohon:'30/2/2024',keputusan:'GAGAL', status: 'Selesai', },
        ],
    };

    return {
        param,
        response,
    };
};
