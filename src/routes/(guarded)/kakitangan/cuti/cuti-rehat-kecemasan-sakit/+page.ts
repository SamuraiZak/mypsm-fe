import api from '$lib/services/core/ky.service';

export const load = async () => {
    // console.log('HEY');
    // const hrmisLeavesResponse: Response = await api
    //     .get('api/v1/leaves/leaves/hrmis')
    //     .json();

    try {
        await api.get('api/v1/leaves/leaves/hrmis').json();
    } catch (error) {
        if (error.name === 'HTTPError') {
            const errorJson = await error.response.json();
            console.log(errorJson);
        }
    }

    const hrmisOutOfOfficeResponse: Response = await api
        .get('api/v1/leaves/leaves/hrmis-out-of-office')
        .json();

    // else hrmisLeaves = hrmisLeavesResponse.data;
    // if (hrmisLeavesResponse.status !== 200) ;
    // let hrmisLeaves = undefined;
    // if (hrmisLeavesResponse.status > 200) {
    //     hrmisLeaves = undefined;
    // } else hrmisLeaves = hrmisLeavesResponse.data;

    const hrmisOutOfOffice = hrmisOutOfOfficeResponse.data;

    return {
        // hrmisLeaves,
        hrmisOutOfOffice,
    };
};
