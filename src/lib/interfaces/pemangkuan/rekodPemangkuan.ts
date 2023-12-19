/* eslint-disable @typescript-eslint/no-unused-vars */
interface Pemangkuan {
    idPemangkuan: string;
    jenisPemangkuan: string;
    tarikhRekod: string;
    jumlahCalon: number;
    statusPerlaksanaan: string;
}

interface CalonPemangkuan {
    idCalon: string;
    idPemangkuan: string;
    namaCalon: string;
    noKPCalon: string;
    program: string;
    skim: string;
    gred: string;
    namaJawatan: string;
    penempatanSekarang: string;
}
