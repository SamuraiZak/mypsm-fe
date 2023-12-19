export const mockPemeriksaan: IntPemeriksaanDoktor = {
    id: '001',
    pemeriksaan_am: {
        tinggi: 181,
        berat: 79,
        bmi: 124,
        denyutan_nadi: 89,
        tekanan_darah: 234,
        kulit_pucat: false,
        sianosis: false,
        edema: false,
        penyakit_kuning: false,
        kelenjar_limfa: false,
        penyakit_kulit: false,
    },
    pemeriksaan_mata: {
        penglihatan_tanpa_bantuan_kanan: '6/6',
        penglihatan_tanpa_bantuan_kiri: '6/6',
        penglihatan_dengan_bantuan_kanan: '6/6',
        penglihatan_dengan_bantuan_kiri: '6/6',
        penglihatan_warna: {
            normal: true,
            ulasan: '',
        },
        funduskopi: {
            normal: true,
            ulasan: '',
        },
    },
    pemeriksaan_telinga: {
        normal: true,
        ulasan: '',
    },
    rongga_gigi_dan_mulut: {
        normal: true,
        ulasan: '',
    },
    leher: {
        normal: true,
        ulasan: '',
    },
    kardiovaskular: {
        normal: true,
        ulasan: '',
    },
    sistem_pernafasan: {
        pernafasan: {
            normal: true,
            ulasan: '',
        },
        x_ray: {
            normal: true,
            ulasan: '',
        },
        tarikh_pengambilan_x_ray: '',
        lokasi_pengambilan_x_ray: '',
        nombor_rujukan_x_ray: '',
    },
    abdomen_dan_hernia: {
        normal: true,
        ulasan: '',
    },
    sistem_saraf_dan_keadaan_mental: {
        normal: true,
        ulasan: '',
    },
    sistem_muskuloskeletal: {
        normal: true,
        ulasan: '',
    },
    kencing: {
        gula: false,
        albumin: false,
        mikroskopi: '',
    },
};
