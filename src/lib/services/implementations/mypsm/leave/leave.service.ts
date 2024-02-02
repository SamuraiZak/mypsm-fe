// ===============================================================
// Service Allowance Module Services
// ===============================================================

import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { AddLeaveApprovalResultRequestBody } from '$lib/dto/mypsm/leave/add-leave-approvers-results-request.model';
import type { AddAlternateUntrackedLeaveRequest } from '$lib/dto/mypsm/leave/leave-applications/alternate-untracked-leave/add-alternate-untracked-leave-request.dto';
import type { AddHajiLeaveRequest } from '$lib/dto/mypsm/leave/leave-applications/haji-leave/add-haji-leave-request.dto';
import type { AddHalfPayLeaveRequest } from '$lib/dto/mypsm/leave/leave-applications/halfpay-leave/add-halfpay-leave-request.dto';
import type { LeaveIDRequest } from '$lib/dto/mypsm/leave/leave-applications/leave-id-request.dto';
import type { AddMaternityLeaveRequest } from '$lib/dto/mypsm/leave/leave-applications/maternity-leave/add-maternity-leave-request.dto';
import type { AddOtherLeavesRequest } from '$lib/dto/mypsm/leave/leave-applications/other-leaves/add-other-leaves-request.dto';
import type { AddReplacementLeaveRequest } from '$lib/dto/mypsm/leave/leave-applications/replacement-leave/add-replacement-leave-request.dto';
import type { AddWithoutPayLeaveRequest } from '$lib/dto/mypsm/leave/leave-applications/without-pay-leave/add-without-pay-leave-request.dto';
import http from '$lib/services/provider/service-provider.service';
import {
    LeaveHistoryListRequestConvert,
    type LeaveHistoryListRequestViewModel,
} from '$lib/view-models/mypsm/leave/report/history/leave-history-list-request.view-model';

export class LeaveServices {
    // // get list of leave
    // static async getLeaveList() {
    //     // fetching data
    //     const response: CommonResponseDTO = await http
    //         .post('leaves/application/leave-list', {
    //             body: LeaveHistoryListRequestConvert.toJson(),
    //         })
    //         .json();

    //     if (response.status! === 'success') {
    //         return response;
    //     } else {
    //         throw new Error('Unknown error');
    //     }
    // }

    // get list of leave history
    static async getLeaveHistoryList(param: LeaveHistoryListRequestViewModel) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post('leaves/leaves/history', {
                body: LeaveHistoryListRequestConvert.toJson(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // ===============================================================
    // Replacement Leave
    // ===============================================================

    // get leave replacement details
    static async getReplacementLeaveDetail(param: LeaveIDRequest) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post('leaves/get-replacement-annual-leave', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // create replacement leave
    static async createReplacementLeave(param: AddReplacementLeaveRequest) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post('leaves/add-replacement-annual-leave', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // create approvers results
    static async createReplacementLeaveApproversResults(
        param: AddLeaveApprovalResultRequestBody,
    ) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post('leaves/edit-replacement-annual-leave-process', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // get Director Supporter Detail
    static async getReplacementLeaveDirectorSupporterDetail(
        param: LeaveIDRequest,
    ) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post(
                'leaves/get-replacement-annual-leave-process-director-supporter-detail',
                {
                    body: JSON.stringify(param),
                },
            )
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // get verifier detail
    static async getReplacementLeaveVerifierDetail(param: LeaveIDRequest) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post(
                'leaves/get-replacement-annual-leave-process-verifier-detail',
                {
                    body: JSON.stringify(param),
                },
            )
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // get supporter detail
    static async getReplacementLeaveSupporterDetail(param: LeaveIDRequest) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post(
                'leaves/get-replacement-annual-leave-process-appointed-supporter-detail',
                {
                    body: JSON.stringify(param),
                },
            )
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // get approver detail
    static async getReplacementLeaveApproverDetail(param: LeaveIDRequest) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post(
                'leaves/get-replacement-annual-leave-process-approver-detail',
                {
                    body: JSON.stringify(param),
                },
            )
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // ===============================================================
    // Maternity Leave
    // ===============================================================

    // get maternity leave list
    static async getMaternityLeaveList(param: CommonListRequestDTO) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post('leaves/maternity-leaves', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // get maternity leave detail
    static async getMaternityLeaveDetail(param: LeaveIDRequest) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post('leaves/get-maternity-leave', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // create maternity leave
    static async createMaternityLeave(param: AddMaternityLeaveRequest) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post('leaves/add-maternity-leave', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // create maternity leave approvers results
    static async createMaternityLeaveApproversResults(
        param: AddLeaveApprovalResultRequestBody,
    ) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post('leaves/edit-maternity-leave-process', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // get supporter detail
    static async getMaternityLeaveSupporterDetail(param: LeaveIDRequest) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post('leaves/get-maternity-leave-process-supporter-detail', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // get verifier detail
    static async getMaternityLeaveVerifierDetail(param: LeaveIDRequest) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post('leaves/get-maternity-leave-process-verifier-detail', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // get approver detail
    static async getMaternityLeaveApproverDetail(param: LeaveIDRequest) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post('leaves/get-maternity-leave-process-approver-detail', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // ===============================================================
    // Haji Leave
    // ===============================================================

    // get haji leave list
    static async getHajiLeaveList(param: CommonListRequestDTO) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post('leaves/remote-religious-leaves', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // get haji leave detail
    static async getHajiLeaveDetail(param: LeaveIDRequest) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post('leaves/get-remote-religious-leave', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // create haji leave
    static async createHajiLeave(param: AddHajiLeaveRequest) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post('leaves/add-remote-religious-leave', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // create haji leave approvers results
    static async createHajiLeaveApproversResults(
        param: AddLeaveApprovalResultRequestBody,
    ) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post('leaves/edit-remote-religious-leave-process', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // get haji leave supporter detail
    static async getHajiLeaveSupporterDetail(param: LeaveIDRequest) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post(
                'leaves/get-remote-religious-leave-process-supporter-detail',
                {
                    body: JSON.stringify(param),
                },
            )
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // get haji leave verifier detail
    static async getHajiLeaveVerifierDetail(param: LeaveIDRequest) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post('leaves/get-remote-religious-leave-process-verifier-detail', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // get haji leave approver detail
    static async getHajiLeaveApproverDetail(param: LeaveIDRequest) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post('leaves/get-remote-religious-leave-process-approver-detail', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // ===============================================================
    // Halfpay Leave
    // ===============================================================

    // get halfpay leave list
    static async getHalfPayLeaveList(param: CommonListRequestDTO) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post('leaves/half-pay-leaves', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // get halfpay leave detail
    static async getHalfPayLeaveDetail(param: LeaveIDRequest) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post('leaves/get-half-pay-leave', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // create halfpay leave
    static async createHalfPayLeave(param: AddHalfPayLeaveRequest) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post('leaves/add-half-pay-leave', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // create halfpay leave approvers results
    static async createHalfPayLeaveApproversResults(
        param: AddLeaveApprovalResultRequestBody,
    ) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post('leaves/edit-half-pay-leave-process', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // get halfpay leave supporter detail
    static async getHalfPayLeaveSupporterDetail(param: LeaveIDRequest) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post('leaves/get-half-pay-leave-process-supporter-detail', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // get halfpay leave verifier detail
    static async getHalfPayLeaveVerifierDetail(param: LeaveIDRequest) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post('leaves/get-half-pay-leave-process-verifier-detail', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // get halfpay leave approver detail
    static async getHalfPayLeaveApproverDetail(param: LeaveIDRequest) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post('leaves/get-half-pay-leave-process-approver-detail', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // ===============================================================
    // Alternate untracked Leave
    // ===============================================================

    // get alternate untracked leave list
    static async getAlternateUntrackedLeaveList(param: CommonListRequestDTO) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post('leaves/alternate-untracked-leaves', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // get alternate untracked leave detail
    static async getAlternateUntrackedLeaveDetail(param: LeaveIDRequest) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post('leaves/get-alternate-untracked-leave', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // create alternate untracked leave
    static async createAlternateUntrackedLeave(
        param: AddAlternateUntrackedLeaveRequest,
    ) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post('leaves/add-alternate-untracked-leave', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // create alternate untracked leave approvers results
    static async createAlternateUntrackedLeaveApproversResults(
        param: AddLeaveApprovalResultRequestBody,
    ) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post('leaves/edit-alternate-untracked-leave-process', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // get alternate untracked Director Supporter Detail
    static async getAlternateUntrackedLeaveDirectorSupporterDetail(
        param: LeaveIDRequest,
    ) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post(
                'leaves/get-alternate-untracked-leave-process-director-supporter-detail',
                {
                    body: JSON.stringify(param),
                },
            )
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // get alternate untracked leave supporter detail
    static async getAlternateUntrackedLeaveSupporterDetail(
        param: LeaveIDRequest,
    ) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post(
                'leaves/get-alternate-untracked-leave-process-appointed-supporter-detail',
                {
                    body: JSON.stringify(param),
                },
            )
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // get alternate untracked leave verifier detail
    static async getAlternateUntrackedLeaveVerifierDetail(
        param: LeaveIDRequest,
    ) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post(
                'leaves/get-alternate-untracked-leave-process-verifier-detail',
                {
                    body: JSON.stringify(param),
                },
            )
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // get alternate untracked leave approver detail
    static async getAlternateUntrackedLeaveApproverDetail(
        param: LeaveIDRequest,
    ) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post(
                'leaves/get-alternate-untracked-leave-process-approver-detail',
                {
                    body: JSON.stringify(param),
                },
            )
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // ===============================================================
    // Without Pay Leave
    // ===============================================================

    // get without pay leave list
    static async getWithoutPayLeaveList(param: CommonListRequestDTO) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post('leaves/alternate-untracked-leaves', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // get without pay leave detail
    static async getWithoutPayLeaveDetail(param: LeaveIDRequest) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post('leaves/get-without-pay-leave', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // create without pay leave
    static async createWithoutPayLeave(param: AddWithoutPayLeaveRequest) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post('leaves/add-without-pay-leave', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // create without pay leave approvers results
    static async createWithoutPayLeaveApproversResults(
        param: AddLeaveApprovalResultRequestBody,
    ) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post('leaves/edit-without-pay-leave-process', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // get without pay Director Supporter Detail
    static async getWithoutPayLeaveDirectorSupporterDetail(
        param: LeaveIDRequest,
    ) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post(
                'leaves/get-without-pay-leave-process-director-supporter-detail',
                {
                    body: JSON.stringify(param),
                },
            )
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // get without pay leave supporter detail
    static async getWithoutPayLeaveSupporterDetail(param: LeaveIDRequest) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post(
                'leaves/get-without-pay-leave-process-appointed-supporter-detail',
                {
                    body: JSON.stringify(param),
                },
            )
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // get without pay leave verifier detail
    static async getWithoutPayLeaveVerifierDetail(param: LeaveIDRequest) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post('leaves/get-without-pay-leave-process-verifier-detail', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // get without pay leave approver detail
    static async getWithoutPayLeaveApproverDetail(param: LeaveIDRequest) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post('leaves/get-without-pay-leave-process-approver-detail', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // ===============================================================
    // Other Leaves
    // ===============================================================

    // get other leaves list
    static async getOtherLeavesList(param: CommonListRequestDTO) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post('leaves/other-leaves', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // get other leaves detail
    static async getOtherLeavesDetail(param: LeaveIDRequest) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post('leaves/get-other-leave', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // create other leaves
    static async createOtherLeaves(param: AddOtherLeavesRequest) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post('leaves/add-other-leave', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // create other leaves approvers results
    static async createOtherLeavesApproversResults(
        param: AddLeaveApprovalResultRequestBody,
    ) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post('leaves/edit-other-leave-process', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // get other Directors Supporter Detail
    static async getOtherLeavesConfirmerDetail(param: LeaveIDRequest) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post(
                'leaves/get-other-leave-process-confirmer-detail',
                {
                    body: JSON.stringify(param),
                },
            )
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // get other leaves supporter detail
    static async getOtherLeavesSupporterDetail(param: LeaveIDRequest) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post(
                'leaves/get-other-leave-process-supporter-detail',
                {
                    body: JSON.stringify(param),
                },
            )
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // get other leaves verifier detail
    static async getOtherLeavesVerifierDetail(param: LeaveIDRequest) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post('leaves/get-other-leave-process-verifier-detail', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // get other leaves approver detail
    static async getOtherLeavesApproverDetail(param: LeaveIDRequest) {
        // fetching data
        const response: CommonResponseDTO = await http
            .post('leaves/get-other-leave-process-approver-detail', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }
}
