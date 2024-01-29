export interface EnumGradeResponseViewModel {
    status:  number;
    message: string;
    data:    EnumGradeResponseData;
}

export interface EnumGradeResponseData {
    grades: EnumGrade[];
}

export interface EnumGrade {
    id:   number;
    name: Name;
}

export enum Name {
    BakatDanSeni = "Bakat Dan Seni",
    BakatSeni = "Bakat & Seni",
    Ekonomi = "Ekonomi",
    Kejuruteraan = "Kejuruteraan",
    Kemahiran = "Kemahiran",
    KeselamatanDanPertahananAwam = "Keselamatan Dan Pertahanan Awam",
    Kewangan = "Kewangan",
    MahirSeparuhMahirDanTidakMahir = "Mahir, Separuh Mahir Dan Tidak Mahir",
    Pendidikan = "Pendidikan",
    Pengangkutan = "Pengangkutan",
    PentadbiranDanSokongan = "Pentadbiran Dan Sokongan",
    PenyelidikanDanPembangunan = "Penyelidikan Dan Pembangunan",
    PertahananAwam = "Pertahanan Awam",
    Pertanian = "Pertanian",
    PerubatanDanKesihatan = "Perubatan Dan Kesihatan",
    PerundanganDanKehakiman = "Perundangan Dan Kehakiman",
    Sains = "Sains",
    SistemMaklumat = "Sistem Maklumat",
    Sosial = "Sosial",
    TadbirDanDiplomatik = "Tadbir Dan Diplomatik",
}
