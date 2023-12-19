import { mockLnptAverage } from '$lib/mocks/lnpt/LnptAverage';
import { mockLnptAverageCalc } from '$lib/mocks/lnpt/LnptAverageCalc';

export async function load() {
    const LnptAverageRecord: IntLnptAverage[] = await mockLnptAverage;
    const LnptAverageCalcRecord: IntLnptAverageCalc[] =
        await mockLnptAverageCalc;

    return {
        records: {
            LnptAverageRecord,
            LnptAverageCalcRecord,
        },
    };
}
