import api from '$lib/services/core/ky.service';

export const load = async () => {
    const entitlementResponse = await api
        .get('api/v1/leaves/leaves/entitlement')
        .json();
    const leaveHistoryResponse = await api
        .get('api/v1/leaves/leaves/history')
        .json();

    const entitlements = entitlementResponse.data;
    const leaveHistory = leaveHistoryResponse.data;

    return {
        entitlements,
        leaveHistory,
    };
};
