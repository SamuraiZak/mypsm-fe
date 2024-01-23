import { mockSalaryMovementRecord } from '$lib/mocks/gaji/salaryMovementRecord/mockSalaryMovementRecord';
import api from '$lib/services/core/ky.service';
// import { showLoadingOverlay } from '$lib/stores/globalState';

export async function load() {
    // showLoadingOverlay.set(true);

    const getGredLookup = {
        pageNum: 1,
        pageSize: 10,
        orderBy: 'createdAt',
        orderType: 'asc',
        filter: {},
    };

    console.log(JSON.stringify(getGredLookup));

    // Gred lookup
    // const gredResponse: Response = await api
    //     .post('lookups/grades', {
    //         body: JSON.stringify(getGredLookup),
    //     })
    //     .json();

    const gredLists = undefined
    //  = gredResponse.data.map((element) => ({
    //     value: element.code,
    //     name: element.code,
    // }));



    const salaryMovementRecord: IntSalaryMovementRecord[] =
        await mockSalaryMovementRecord;
    return {
        records: {
            gredLists,
            salaryMovementRecord,
        },
    };
}
