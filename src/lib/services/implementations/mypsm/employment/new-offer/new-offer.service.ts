// ===============================================================
// Employment - New Offer Module Services
// ===============================================================

import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { AddNewOfferRequestBody } from '$lib/dto/mypsm/employment/new-offer/add-new-offer-request.dto';
import type { NewOfferCreateProcessRequest } from '$lib/dto/mypsm/employment/new-offer/new-offer-add-process-request.dto';
import type { NewOfferMeetingIdRequest } from '$lib/dto/mypsm/employment/new-offer/new-offer-meeting-id-request.dto';
import http from '$lib/services/provider/service-provider.service';

export class NewOfferServices {
    // get new offer list
    static async getNewOfferList(
        param: CommonListRequestDTO,
    ): Promise<CommonResponseDTO> {
        // fetch data
        const response: CommonResponseDTO = await http
            .post('employments/new-offers', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // create new offers
    static async createNewOffer(
        param: AddNewOfferRequestBody,
    ): Promise<CommonResponseDTO> {
        // fetch data
        const response: CommonResponseDTO = await http
            .post('employments/new-offer', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // get employee list
    static async getIncludedEmployeeList(
        param: NewOfferMeetingIdRequest,
    ): Promise<CommonResponseDTO> {
        // fetch data
        const response: CommonResponseDTO = await http
            .post('employments/get-new-offer-included-employee', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // get meeting result list
    static async getMeetingResultDetails(
        param: NewOfferMeetingIdRequest,
    ): Promise<CommonResponseDTO> {
        // fetch data
        const response: CommonResponseDTO = await http
            .post('employments/get-new-offer-meeting-result', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // create meeting result
    static async createMeetingResultDetails(
        param: NewOfferMeetingIdRequest,
    ): Promise<CommonResponseDTO> {
        // fetch data
        const response: CommonResponseDTO = await http
            .post('employments/add-new-offer-meeting-result', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! === 'success') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    // KIV create process
    // add model for get new offer process
    static async createNewOfferProcess(
        param: NewOfferCreateProcessRequest,
    ): Promise<CommonResponseDTO> {
        // fetch data
        const response: CommonResponseDTO = await http
            .post('employments/get-new-offer-process', {
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
