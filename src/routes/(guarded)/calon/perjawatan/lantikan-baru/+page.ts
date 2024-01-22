import http from '$lib/services/provider/service-provider.service';

export const load = async () => {
    const getAllLists = {
        pageNum: 1,
        pageSize: 5,
        orderBy: '',
        orderType: '',
        filter: {
            dataType: 'New',
            identityCard: null,
            staffNo: null,
            staffName: null,
            dateRequest: null,
            dateHire: null,
            status: null,
        },
    };

    const response = await http
        .post('employments/new-hires', {
            body: JSON.stringify(getAllLists),
        })
        .json();

    const getThisStaffRecord = response.data.newHires
    // .filter(
    //     (list) => list.temporaryId === 'C1234',
    // );


    return {
        getThisStaffRecord,
    };
};
