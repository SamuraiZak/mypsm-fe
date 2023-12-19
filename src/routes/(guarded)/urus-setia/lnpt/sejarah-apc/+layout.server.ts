import { mockLnptApc } from '$lib/mocks/lnpt/lnptApc';

export async function load() {
    const LnptApcRecord: IntLnptApc[] = await mockLnptApc;

    return {
        records: {
            LnptApcRecord,
        },
    };
}
