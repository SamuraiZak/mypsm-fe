// ===============================================================
// Lookup Services
// ===============================================================

import http from '$lib/services/provider/service-provider.service';
import { EnumAgencyGroupConvert } from '$lib/view-models/core/lookup/agency-group/agency-group-senum.view-model';
import { EnumAssetDeclarationStatusResponseConvert } from '$lib/view-models/core/lookup/asset-declaration/asset-declaration-enum.view-model';
import type { EnumCountryResponse } from '$lib/view-models/core/lookup/country/country-enum.view-model';
import type { EnumGenderResponseViewModel } from '$lib/view-models/core/lookup/gender/gender-enum-response.view-model';
import type { EnumEducationLevelResponseViewModel } from '$lib/view-models/core/lookup/highest-education-level/highest-education-level-enum-response.view-model';
import type { EnumInstituionResponseViewModel } from '$lib/view-models/core/lookup/institution/instituion-enum-response.view-model';
import type { EnumMajorMinorResponse } from '$lib/view-models/core/lookup/major-minor/major-minor-enum.view-model';
import type { EnumMaritalStatusResponseViewModel } from '$lib/view-models/core/lookup/marital-status/marital-status-enum-response.view-model';
import type { EnumNationalityResponseViewModel } from '$lib/view-models/core/lookup/nationality-enum/nationality-enum-response.view-model';
import type { EnumRaceResponseViewModel } from '$lib/view-models/core/lookup/race/race-enum-response.view-model';
import type { EnumRelationshipResponseViewModel } from '$lib/view-models/core/lookup/relationship/relationship-enum-response.view-model';
import type { EnumSponsorshipResponseViewModel } from '$lib/view-models/core/lookup/sponsorship/sponsorship-enum-response.view-model';
import type { EnumStateResponse } from '$lib/view-models/core/lookup/state/state-enum-response.model';

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
    // get state list
    static async getEnumStateList(): Promise<EnumStateResponse> {
        const response: EnumStateResponse = await http
            .get(`lookups/states`)
            .json();

        return response;
    }
    // get relationship list
    static async getEnumRelationshipList(): Promise<EnumRelationshipResponseViewModel> {
        const response: EnumRelationshipResponseViewModel = await http
            .get(`lookups/relationships`)
            .json();

        return response;
    }
    // get race list
    static async getEnumRaceList(): Promise<EnumRaceResponseViewModel> {
        const response: EnumRaceResponseViewModel = await http
            .get(`lookups/races`)
            .json();

        return response;
    }
    // get nationality list
    static async getEnumNationalityList(): Promise<EnumNationalityResponseViewModel> {
        const response: EnumNationalityResponseViewModel = await http
            .get(`lookups/nationalities`)
            .json();

        return response;
    }
    // get marital list
    static async getEnumMaritalList(): Promise<EnumMaritalStatusResponseViewModel> {
        const response: EnumMaritalStatusResponseViewModel = await http
            .get(`lookups/marital-statuses`)
            .json();

        return response;
    }
    // get gender list
    static async getEnumGenderList(): Promise<EnumGenderResponseViewModel> {
        const response: EnumGenderResponseViewModel = await http
            .get(`lookups/genders`)
            .json();

        return response;
    }
}
