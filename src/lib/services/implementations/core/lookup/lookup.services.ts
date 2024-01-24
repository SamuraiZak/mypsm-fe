// ===============================================================
// Lookup Services
// ===============================================================

import http from '$lib/services/provider/service-provider.service';
import { EnumAgencyGroupConvert } from '$lib/view-models/core/lookup/agency-group/agency-group-senum.view-model';
import { EnumAssetDeclarationStatusResponseConvert } from '$lib/view-models/core/lookup/asset-declaration/asset-declaration-enum.view-model';
import type { EnumCountryResponse } from '$lib/view-models/core/lookup/country/country-enum.view-model';
import type { EnumEducationLevelResponseViewModel } from '$lib/view-models/core/lookup/highest-education-level/highest-education-level-enum-response.view-model';
import type { EnumInstituionResponseViewModel } from '$lib/view-models/core/lookup/institution/instituion-enum-response.view-model';
import type { EnumMajorMinorResponse } from '$lib/view-models/core/lookup/major-minor/major-minor-enum.view-model';
import type { EnumSponsorshipResponseViewModel } from '$lib/view-models/core/lookup/sponsorship/sponsorship-enum-response.view-model';

export class LookupService {
    // get list of agency group
    static async getEnumAgencyGroup() {
        const response: Response = await http
            .get('/lookups/agency-groups', {
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                },
            })
            .json();

        return EnumAgencyGroupConvert.fromResponse(response);
    }

    // get list of asset declation status
    static async getEnumAssetDeclarationStatus() {
        const response: Response = await http
            .get('/lookups/agency-groups', {
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                },
            })
            .json();

        return EnumAssetDeclarationStatusResponseConvert.fromResponse(response);
    }

    // get sponsorships list
    static async getEnumSponsorshipList(): Promise<EnumSponsorshipResponseViewModel> {
        const response: EnumSponsorshipResponseViewModel = await http
            .get(`lookups/sponsorships`)
            .json();

        return response;
    }

    // get education list
    static async getEnumEducationList(): Promise<EnumEducationLevelResponseViewModel> {
        const response: EnumEducationLevelResponseViewModel = await http
            .get(`lookups/highest-education-levels`)
            .json();

        return response;
    }

    // get institutions list
    static async getEnumInstitutionList(): Promise<EnumInstituionResponseViewModel> {
        const response: EnumInstituionResponseViewModel = await http
            .get(`lookups/institutions`)
            .json();

        return response;
    }

    // get country list
    static async getEnumCountryList(): Promise<EnumCountryResponse> {
        const response: EnumCountryResponse = await http
            .get(`lookups/countries`)
            .json();

        return response;
    }

    // get major and Minor list
    static async getEnumMajorMinorList(): Promise<EnumMajorMinorResponse> {
        const response: EnumMajorMinorResponse = await http
            .get(`lookups/major-minors`)
            .json();

        return response;
    }
}
