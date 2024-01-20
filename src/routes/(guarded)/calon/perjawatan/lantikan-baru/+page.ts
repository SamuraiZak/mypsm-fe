import api from '$lib/services/core/ky.service';

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

    const response = await api
        .post('api/v1/employments/new-hires', {
            body: JSON.stringify(getAllLists),
        })
        .json();

    const getThisStaffRecord = response.data.newHires.filter(
        (list) => list.temporaryId === 'C1234',
    );


    return {
        getThisStaffRecord,
    };
};
