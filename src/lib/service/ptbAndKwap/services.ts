import { mockPTBdanKWAP } from '$lib/mocks/perjawatan/PTB-dan-KWAP/PTB-dan-KWAP';
const db = new Map();

export async function fetchPtbKwap(): Promise<PtbAndKwap[]> {
    const response: PtbAndKwap[] = await mockPTBdanKWAP; // Replace with your API URL
    return response;
}

export async function getPtbKwapdetail(userid: string | undefined) {
    if (!db.get(userid)) {
        throw new Error('Maklumat tidak wujud!');
    }

    return db.get(userid);
}

export async function setPtbKwap(
    userid: string | undefined,
    data: FormData | null,
) {
    if (data === null) {
        throw new Error('Maklumat hendaklah tepat');
    }

    const ptb = db.get(userid);

    ptb.push({
        ptbDate: data.get('ptb-date'),
        letterRefNumber: data.get('letter-ref-number'),
        letterRefDate: data.get('letter-ref-date'),
        pensionNumber: data.get('pension-number'),
        kwapDate: data.get('kwap-date'),
    });
}
