/* eslint-disable @typescript-eslint/no-unused-vars */
interface IntPemeriksaanDoktor {
    id: string;
    pemeriksaan_am: IntPemeriksaanAm;
    pemeriksaan_mata: IntPemeriksaanMata;
    pemeriksaan_telinga: IntTelinga;
    rongga_gigi_dan_mulut: IntRonggaGigiDanMulut;
    leher: IntLeher;
    kardiovaskular: IntKardiovaskular;
    sistem_pernafasan: IntSistemPernafasan;
    abdomen_dan_hernia: IntAbdomenDanHernia;
    sistem_saraf_dan_keadaan_mental: IntSistemSarafDanKeadaanMental;
    sistem_muskuloskeletal: IntMuskuloskeletal;
    kencing: IntKencing;
}

interface IntPemeriksaanAm {
    tinggi: number;
    berat: number;
    bmi: number;
    denyutan_nadi: number;
    tekanan_darah: number;
    kulit_pucat: boolean;
    sianosis: boolean;
    edema: boolean;
    penyakit_kuning: boolean;
    kelenjar_limfa: boolean;
    penyakit_kulit: boolean;
}

interface IntPemeriksaanMata {
    penglihatan_tanpa_bantuan_kanan: string;
    penglihatan_tanpa_bantuan_kiri: string;
    penglihatan_dengan_bantuan_kanan: string;
    penglihatan_dengan_bantuan_kiri: string;
    penglihatan_warna: IntPenglihatanWarna;
    funduskopi: IntFunduskopi;
}

interface IntPenglihatanWarna {
    normal: boolean;
    ulasan: string;
}

interface IntFunduskopi {
    normal: boolean;
    ulasan: string;
}

interface IntTelinga {
    normal: boolean;
    ulasan: string;
}

interface IntRonggaGigiDanMulut {
    normal: boolean;
    ulasan: string;
}

interface IntLeher {
    normal: boolean;
    ulasan: string;
}

interface IntKardiovaskular {
    normal: boolean;
    ulasan: string;
}

// sistem pernafasan

interface IntSistemPernafasan {
    pernafasan: IntPernafasanPemeriksaan;
    x_ray: IntPernafasanXRay;
    tarikh_pengambilan_x_ray: string;
    lokasi_pengambilan_x_ray: string;
    nombor_rujukan_x_ray: string;
}

interface IntPernafasanPemeriksaan {
    normal: boolean;
    ulasan: string;
}

interface IntPernafasanXRay {
    normal: boolean;
    ulasan: string;
}

interface IntAbdomenDanHernia {
    normal: boolean;
    ulasan: string;
}

interface IntSistemSarafDanKeadaanMental {
    normal: boolean;
    ulasan: string;
}

interface IntMuskuloskeletal {
    normal: boolean;
    ulasan: string;
}

interface IntKencing {
    gula: boolean;
    albumin: boolean;
    mikroskopi: string;
}
