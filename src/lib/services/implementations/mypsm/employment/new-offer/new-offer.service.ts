// ===============================================================
// Employment - New Offer Module Services
// ===============================================================

import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { AddNewOfferRequestBody } from '$lib/dto/mypsm/employment/new-offer/add-new-offer-request.dto';
import type { NewOfferMeetingIdRequest } from '$lib/dto/mypsm/employment/new-offer/new-hire-meeting-id-request.dto';
import http from '$lib/services/provider/service-provider.service';

export class NewOfferServices {
    static async getNewOfferList(
        param: CommonListRequestDTO,
    ): Promise<CommonResponseDTO> {
        // fetch data
        const response: CommonResponseDTO = await http
            .post('employments/new-offers', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! >= '200' && response.status! < '300') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    static async createNewOffer(
        param: AddNewOfferRequestBody,
        ): Promise<CommonResponseDTO> {
            // fetch data
        const response: CommonResponseDTO = await http
        .post('employments/new-offer', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! >= '200' && response.status! < '300') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }

    static async getIncludedEmployeeList(
        param: NewOfferMeetingIdRequest,
    ): Promise<CommonResponseDTO> {
        // fetch data
        const response: CommonResponseDTO = await http
            .post('employments/new-offers', {
                body: JSON.stringify(param),
            })
            .json();

        if (response.status! >= '200' && response.status! < '300') {
            return response;
        } else {
            throw new Error('Unknown error');
        }
    }
}
