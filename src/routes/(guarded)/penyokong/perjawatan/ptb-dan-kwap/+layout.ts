// import { fetchPtbKwap } from '$lib/service/ptbAndKwap/services';

import { mockPTBdanKWAP } from '$lib/mocks/perjawatan/PTB-dan-KWAP/ptb-dan-kwap.js';

export async function load() {
    const fetchedData: PtbAndKwap[] = mockPTBdanKWAP;

    return {
        props: {
            lists: fetchedData.map((list) => ({
                noPekerja: list.noPekerja,
                namaPekerja: list.namaPekerja,
                noKadPengenalan: list.noKadPengenalan,
                kategori: list.kategori,
                tarikhMohon: list.tarikhMohon,
                status: 'KEMASKINI',
                tindakanUlasan: list.tindakanUlasan,
            })),
        },
    };
}