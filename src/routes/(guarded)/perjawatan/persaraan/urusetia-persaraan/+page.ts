export const load = async () => {
    const param = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
    };

    const dataList = [
        { noPekerja:'0001', namaPekerja: 'Ali bin Ahmad', jawatan:'Pegawai Teknologi Maklumat', tarikhPermohonanbersaraAwal:'25/08/2023', penempatanSekarang:'00105-Bhgn Teknologi Maklumat', jenisPersaraan:'Persaraan Pilihan', status:'Sah',tindakan:'' },
        
       
    ];
    const dataList2 = [
        { noPekerja:'0002', namaPekerja: 'Zakaria bin Osman', jawatan:'Pegawai Teknologi Maklumat', tarikhPermohonanbersaraAwal:'25/08/2023',  penempatanSekarang:'00105-Bhgn Teknologi Maklumat', jenisPersaraan:'Persaraan Pilihan', status:'Sah',tindakan:'' },
       
    ];
    const dataList3 = [
        { noPekerja:'0003', namaPekerja: 'husna bin Johari', jawatan:'Pegawai Teknologi Maklumat', tarikhPermohonanbersaraAwal:'25/08/2023',  penempatanSekarang:'00105-Bhgn Teknologi Maklumat', jenisPersaraan:'Persaraan Pilihan', status:'Sah',tindakan:'' },
       
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
            { noPekerja:'0001', namaPekerja: 'Ali bin Ahmad', jawatan:'Pegawai Teknologi Maklumat', tarikhPermohonanbersaraAwal:'25/08/2023',  penempatanSekarang:'00105-Bhgn Teknologi Maklumat', jenisPersaraan:'Persaraan Pilihan', status:'Sah',tindakan:''  },
    
        ],

        dataList2: [
            { noPekerja:'0002', namaPekerja: 'Zakaria bin Osman', jawatan:'Pegawai Teknologi Maklumat', tarikhPermohonanbersaraAwal:'25/08/2023', penempatanSekarang:'00105-Bhgn Teknologi Maklumat', jenisPersaraan:'Persaraan Pilihan', status:'Sah',tindakan:''   },
        
        ],
        dataList3: [
            { noPekerja:'0002', namaPekerja: 'husna bin Johari', jawatan:'Pegawai Teknologi Maklumat', tarikhPermohonanbersaraAwal:'25/08/2023',  penempatanSekarang:'00105-Bhgn Teknologi Maklumat', jenisPersaraan:'Persaraan Pilihan', status:'Sah',tindakan:''  },
        
        ],
    };

    return {
        param,
        response,
    };
};
