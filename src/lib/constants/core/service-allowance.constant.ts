// ===============================================================
// Service Allowance Type Constant
// ===============================================================

import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';

export class ServiceAllowanceTypeConstant {
    public static bantuanPakaianIstiadat: LookupDTO = {
        id: 1,
        code: '6b8fc037-ad27-455e-8819-e85452a2f3f5',
        description: 'Bantuan Pakaian Istiadat',
        url: 'bantuan-pakaian-istiadat',
    };
    public static bantuanPakaianPanas: LookupDTO = {
        id: 2,
        code: 'd9139301-9dcc-4411-9618-4864d3cf5b33',
        description: 'Bantuan Pakaian Panas',
        url: 'bantuan-pakaian-panas',
    };
    public static tambangMengunjungiWilayahAsal: LookupDTO = {
        id: 3,
        code: '70bb8321-0b38-4498-97a7-24b02ac2dd41',
        description: 'Tambang Mengunjungi Wilayah Asal',
        url: 'tambang-mengunjungi-wilayah-asal',
    };
    public static bantuanMengurusJenazah: LookupDTO = {
        id: 4,
        code: '61ed6a0e-3ce7-437c-8a91-bf57ca714e6a',
        description: 'Bantuan Mengurus Jenazah',
        url: 'bantuan-mengurus-jenazah',
    };
    public static tabungKebajikanKakitangan: LookupDTO = {
        id: 5,
        code: 'a048246c-5a4c-44a9-9fe5-15d7f7da0a12',
        description: 'Tabung Kebajikan Kakitangan',
        url: 'tabung-kebajikan-kakitangan',
    };
    public static perpindahanRumah: LookupDTO = {
        id: 6,
        code: '3cf3f415-e2a3-4e74-bc92-3fbdf74e2260',
        description: 'Perpindahan Rumah',
        url: 'perpindahan-rumah',
    };
    public static pembayaranBalikPassport: LookupDTO = {
        id: 7,
        code: 'e4003ad1-b0d9-4f14-90f9-86ca3799c4d4',
        description: 'Pembayaran Balik Passport',
        url: 'pembayaran-balik-passport',
    };
    public static insuransKesihatan: LookupDTO = {
        id: 8,
        code: 'c6a10d4f-75d5-4704-a58a-a12de70d1edb',
        description: 'Insurans Kesihatan',
        url: 'insurans-kesihatan',
    };
    public static bayaranBalikPengangkutanBarang: LookupDTO = {
        id: 9,
        code: '256427cf-519a-4a51-9fdd-00007f65e1ba',
        description: 'Bayaran Balik Pengangkutan Barang Melalui Jalan Laut',
        url: 'bayaran-balik-pengangkutan-barang-melalui-jalan-laut',
    };

    public static list: LookupDTO[] = [
        this.bantuanPakaianIstiadat,
        this.bantuanPakaianPanas,
        this.tambangMengunjungiWilayahAsal,
        this.bantuanMengurusJenazah,
        this.tabungKebajikanKakitangan,
        this.perpindahanRumah,
        this.pembayaranBalikPassport,
        this.insuransKesihatan,
        this.bayaranBalikPengangkutanBarang,
    ];
}
