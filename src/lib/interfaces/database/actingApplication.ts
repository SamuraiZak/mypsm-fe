/* eslint-disable @typescript-eslint/no-unused-vars */
export interface IntActingApplication {
    idRekod: number;
    jenisPemangkuan: string;
    tarikhRekod: string;
    jumlahCalon: number;
    status: string;
    calonPemangkuan: CalonPemangkuan[];
}

export interface CalonPemangkuan {
    idRekod: number;
    idKakitangan: number;
    nomborPekerja: string;
    namaKakitangan: string;
    nomborKP: string;
    gredSemasa: string;
    jawatanSemasa: string;
    mesyuaratPemilihanCalonPemangkuan?: MesyuaratPemilihanCalonPemangkuan;
    temuduga?: Temuduga;
    semakanPemangkuan?: SemakanPemangkuan;
    mesyuaratJawatanKuasaKenaikanPangkat?: MesyuaratJawatanKuasaKenaikanPangkat;
    mesyuaratPenempatanKakitangan?: MesyuaratPenempatanKakitangan;
    permohonanPenangguhanAtauPindaan?: PermohonanPenangguhanAtauPindaan;
    keputusanPemangkuanAkhir?: KeputusanPemangkuanAkhir;
}

export interface KeputusanPemangkuanAkhir {
    kodJawatanMemangku: string;
    gelaranJawatanMemangku: string;
    tarikhKuatKuasaPemangkuan: string;
    tarikhCukupTempohPemangkuan: string;
    penempatanBaru: string;
    tarikhLaporDiri: string;
}

export interface MesyuaratJawatanKuasaKenaikanPangkat {
    keputusan: string;
    kodJawatanMemangku: string;
    gelaranJawatanMemangku: string;
    tarikhKuatkuasaPemangkuan: string;
    tarikhCukupTempohPemangkuan: string;
}

export interface MesyuaratPemilihanCalonPemangkuan {
    gredUntukDipangku: string;
    jawatanUntukDipangku: string;
    layakTemuduga: string;
}

export interface MesyuaratPenempatanKakitangan {
    penempatanBaru: string;
    tarikhLaporDiri: string;
}

export interface PermohonanPenangguhanAtauPindaan {
    penempatanBaru: string;
    tarikhLaporDiri: string;
    keputusan?: string;
}

export interface SemakanPemangkuan {
    laporanTatatertib: string;
    laporanPrestasi: string;
    laporanSprm: string;
    perakuanKetuaJabatan: string;
}

export interface Temuduga {
    tarikhTemuduga: string;
    masaTemuduga: string;
    pusatTemuduga: string;
    markahTemuduga: string;
    keputusanTemuduga: string;
}

export interface DtoCalonPemangkuan {
    idRekod: number;
    idKakitangan: number;
    nomborPekerja: string;
    namaKakitangan: string;
    nomborKP: string;
    gredSemasa: string;
    gredPemangkuan: string;
    jawatanSemasa: string;
    program: string;
    skim: string;
    penempatanSekarang: string;
    // mesyuarat
    gredUntukDipangku?: string;
    jawatanUntukDipangku?: string;
    layakTemuduga?: string;
    // temuduga
    tarikhTemuduga?: string;
    masaTemuduga?: string;
    pusatTemuduga?: string;
    markahTemuduga?: string;
    keputusanTemuduga?: string;
    // semakan
    laporanTatatertib?: string;
    laporanPrestasi?: string;
    laporanSprm?: string;
    perakuanKetuaJabatan?: string;
    // mesyuarat kenaikan pangkat
    keputusanKenaikanPangkat?: string;
    kodJawatanMemangku?: string;
    gelaranJawatanMemangku?: string;
    tarikhKuatkuasaPemangkuan?: string;
    tarikhCukupTempohPemangkuan?: string;
    // mesyuarat penempatan
    penempatanBaru?: string;
    tarikhLaporDiri?: string;
    // permohonan penangguhan
    permohonanPenangguhan?: string; 
    penempatanDipohon?: string;
    tarikhLaporDiriDipohon?: string;
    keputusanPenangguhanAtauPindaan?: string;
    // keputusan akhir
    kodJawatanMemangkuAkhir?: string;
    gelaranJawatanMemangkuAkhir?: string;
    tarikhKuatKuasaPemangkuanAkhir?: string;
    tarikhCukupTempohPemangkuanAkhir?: string;
    penempatanBaruAkhir?: string;
    tarikhLaporDiriAkhir?: string;
}
