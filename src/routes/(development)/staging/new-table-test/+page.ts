
import { NewHireServices } from '$lib/services/implementations/mypsm/employment/new-hire/new-hire.service';
import { showLoadingOverlay } from '$lib/stores/globalState';
import type { NewHireListRequestViewModel } from '$lib/view-models/mypsm/employment/new-hire/default/new-hire-list-request.view-model';
import type { NewHireListResponseViewModel } from '$lib/view-models/mypsm/employment/new-hire/default/new-hire-list-response.view-model';


export async function load() {
    showLoadingOverlay.set(true);

    const param: NewHireListRequestViewModel = {
        pageNum: 1,
        pageSize: 5,
        orderBy: '',
        orderType: '',
        filter: {
            dataType: "New",
            identityCard: null,
            staffNo: null,
            staffName: null,
            dateRequest: null,
            dateHire: null,
            status: null,
        },
    };

    const newHireList: NewHireListResponseViewModel = await NewHireServices.getNewHireList(param);

    setTimeout(() => showLoadingOverlay.set(false), 2500);
    return {
        props: {
            newHireList,
            param,
        },
    };
}

