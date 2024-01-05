// import * as ptbService from '$lib/service/ptbAndKwap/services.js';
// import { fetchPtbKwap } from '$lib/service/ptbAndKwap/services.js';
import { mockPTBdanKWAP } from '$lib/mocks/perjawatan/PTB-dan-KWAP/ptb-dan-kwap.js';
import { fail } from '@sveltejs/kit';

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

export const actions = {
    create: async ({ request }) => {
        await new Promise((fulfil) => setTimeout(fulfil, 1000));

        const data = await request.formData();

        try {
            // await ptbService.setPtbKwap(cookies.get('userId'), data);
            // db.createTodo(cookies.get('userId'), data.get('description'));
        } catch (err: unknown) {
            return fail(422, {
                ptbDate: data.get('ptb-date'),
                letterRefNumber: data.get('letter-ref-number'),
                letterRefDate: data.get('letter-ref-date'),
                pensionNumber: data.get('pension-number'),
                kwapDate: data.get('kwap-date'),
                error: (err as Error).message,
            });
        }
    },
};
