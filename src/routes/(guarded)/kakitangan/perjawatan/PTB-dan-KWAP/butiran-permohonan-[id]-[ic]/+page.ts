// import * as ptbService from '$lib/service/ptbAndKwap/services.js';
// import { fetchPtbKwap } from '$lib/service/ptbAndKwap/services.js';
import { mockPTBdanKWAP } from '$lib/mocks/perjawatan/PTB-dan-KWAP/ptb-dan-kwap.js';

export async function load({ params }) {
    const data: PtbAndKwap[] = mockPTBdanKWAP;

    const record: PtbAndKwap | undefined = data.find(
        (record) =>
            record.noPekerja === params.id &&
            record.noKadPengenalan === params.ic,
    );

    if (!record) throw new Error('Record not found');

    return { record };
}
