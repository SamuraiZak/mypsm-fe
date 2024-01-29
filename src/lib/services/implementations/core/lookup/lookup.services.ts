// ===============================================================
// Lookup Services
// ===============================================================

import http from '$lib/services/provider/service-provider.service';
import { EnumAgencyGroupConvert } from '$lib/view-models/core/lookup/agency-group/agency-group-senum.view-model';
import { EnumAssetDeclarationStatusResponseConvert } from '$lib/view-models/core/lookup/asset-declaration/asset-declaration-enum.view-model';
import { type EnumAgencyGroupResponseViewModel } from '$lib/view-models/core/lookup/agency-group/agency-group-senum.view-model';
import { type EnumAssetDeclarationStatusResponseViewModel } from '$lib/view-models/core/lookup/asset-declaration/asset-declaration-enum.view-model';
import type { EnumAwardCategoryReponseViewModel } from '$lib/view-models/core/lookup/award-category/award-category.view-model';
import type { EnumAwardResponseViewModel } from '$lib/view-models/core/lookup/award/award.view-model';
import type { EnumCityResponseViewModel } from '$lib/view-models/core/lookup/city/city.view-model';
import type { EnumCountryResponseViewModel } from '$lib/view-models/core/lookup/country/country-enum.view-model';
import type { EnumDepartmentResponseViewModel } from '$lib/view-models/core/lookup/department/department-enum-response.view-model';
import type { EnumDistrictResponseViewModel } from '$lib/view-models/core/lookup/district/district-enum-response.view-model';
import type { EnumDivisionResponseViewModel } from '$lib/view-models/core/lookup/diviision/division-enum-response.view-model';
import type { EnumEmploymentStatusResponseViewModel } from '$lib/view-models/core/lookup/employment-status/employment-status.view-model';
import type { EnumEthnicityResponseViewModel } from '$lib/view-models/core/lookup/ethnicity/enum-ethnicity-response.view-model';
import type { EnumGenderResponseViewModel } from '$lib/view-models/core/lookup/gender/gender-enum-response.view-model';
import type { EnumGradeResponseViewModel } from '$lib/view-models/core/lookup/grade/grade-enum-response.view-model';
import type { EnumEducationLevelResponseViewModel } from '$lib/view-models/core/lookup/highest-education-level/highest-education-level-enum-response.view-model';
import type { EnumLoginIDTypeResponseViewModel } from '$lib/view-models/core/lookup/id-type/id-type-enum-response.view-model';
import type { EnumInstituionResponseViewModel } from '$lib/view-models/core/lookup/institution/instituion-enum-response.view-model';
import type { EnumMajorMinorResponseViewModel } from '$lib/view-models/core/lookup/major-minor/major-minor-enum.view-model';
import type { EnumMaritalStatusResponseViewModel } from '$lib/view-models/core/lookup/marital-status/marital-status-enum-response.view-model';
import type { EnumNationalityResponseViewModel } from '$lib/view-models/core/lookup/nationality-enum/nationality-enum-response.view-model';
import type { EnumPlacementResponseViewModel } from '$lib/view-models/core/lookup/placement/placement-enum-response.view-model';
import type { EnumPositionResponseViewModel } from '$lib/view-models/core/lookup/position/position-enum-response.view-model';
import type { EnumRaceResponseViewModel } from '$lib/view-models/core/lookup/race/race-enum-response.view-model';
import type { EnumRelationshipResponseViewModel } from '$lib/view-models/core/lookup/relationship/relationship-enum-response.view-model';
import type { EnumReligionResponseViewModel } from '$lib/view-models/core/lookup/religion/religion-enum-response.view-model';
import type { EnumRoleResponseViewModel } from '$lib/view-models/core/lookup/role/role-enum-reponse.view-model';
import type { EnumSchemeOfServiceResponseViewModel } from '$lib/view-models/core/lookup/scheme-of-service/scheme-of-service-enum-response.view-model';
import type { EnumSectionResponseViewModel } from '$lib/view-models/core/lookup/section/section-enum-response.view-model';
import type { EnumServiceClassResponseViewModel } from '$lib/view-models/core/lookup/service-class/service-class-enum-response.view-model';
import type { EnumServiceGroupResponseViewModel } from '$lib/view-models/core/lookup/service-group/service-group-enum-response.view-model';
import type { EnumServiceTypeResponseViewModel } from '$lib/view-models/core/lookup/service-type/service-type-enum-response.view-model';
import type { EnumSponsorshipResponseViewModel } from '$lib/view-models/core/lookup/sponsorship/sponsorship-enum-response.view-model';
import type { EnumStateResponseViewModel } from '$lib/view-models/core/lookup/state/state-enum-response.model';
import type { EnumTitleResponseViewModel } from '$lib/view-models/core/lookup/title/title-enum-response.view-model';
import type { EnumUnitResponseViewModel } from '$lib/view-models/core/lookup/unit/unit-enum-response.view-model';

export class LookupService {
    // get list of agency group
    // static async getEnumAgencyGroup() {
    //     const response: Response = await http
    //         .get('/lookups/agency-groups', {
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-type': 'application/json',
    //             },
    //         })
    //         .json();

    //     return EnumAgencyGroupConvert.fromResponse(response);
    // }

    // get agency group list
    static async getEnumAgencyGroupList(): Promise<EnumAgencyGroupResponseViewModel> {
        const response: EnumAgencyGroupResponseViewModel = await http
            .get(`lookups/agency-groups`)
            .json();

        return response;
    }

    // get list of asset declaration status
    // static async getEnumAssetDeclarationStatus() {
    //     const response: Response = await http
    //         .get('/lookups/asset-declaration-statuses', {
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-type': 'application/json',
    //             },
    //         })
    //         .json();

    //     return EnumAssetDeclarationStatusResponseConvert.fromResponse(response);
    // }

    // get asset declaration status list
    static async getEnumAssetDeclarationStatus(): Promise<EnumAssetDeclarationStatusResponseViewModel> {
        const response: EnumAssetDeclarationStatusResponseViewModel = await http
            .get(`lookups/asset-declaration-statuses`)
            .json();

        return response;
    }

    // get award list
    static async getEnumAwardList(): Promise<EnumAwardResponseViewModel> {
        const response: EnumAwardResponseViewModel = await http
            .get(`lookups/awards`)
            .json();

        return response;
    }

    // get award category
    static async getEnumAwardCategoryList(): Promise<EnumAwardCategoryReponseViewModel> {
        const response: EnumAwardCategoryReponseViewModel = await http
            .get(`lookups/award-categories`)
            .json();

        return response;
    }

    // get city list
    static async getEnumCityList(): Promise<EnumCityResponseViewModel> {
        const response: EnumCityResponseViewModel = await http
            .get(`lookups/cities`)
            .json();

        return response;
    }

    // get country list
    static async getEnumCountryList(): Promise<EnumCountryResponseViewModel> {
        const response: EnumCountryResponseViewModel = await http
            .get(`lookups/countries`)
            .json();

        return response;
    }

    // get department list
    static async getEnumDepartmentList(): Promise<EnumDepartmentResponseViewModel> {
        const response: EnumDepartmentResponseViewModel = await http
            .get(`lookups/departments`)
            .json();

        return response;
    }

    // get district list
    static async getEnumDistrictList(): Promise<EnumDistrictResponseViewModel> {
        const response: EnumDistrictResponseViewModel = await http
            .get(`lookups/districts`)
            .json();

        return response;
    }
    
    // get division list
    static async getEnumDivisionList(): Promise<EnumDivisionResponseViewModel> {
        const response: EnumDivisionResponseViewModel = await http
            .get(`lookups/divisions`)
            .json();

        return response;
    }

    // get education major list - no folder in Postman
    // static async getEnumEducationMajorList(): Promise<EnumEducationMajorResponseViewModel> {
    //      const response: EnumEducationMajorResponseViewModel = await http
    //          .get(`lookups/agency-group`)
    //          .json();

    //      return response;
    //  }

    // get education list
    static async getEnumEducationList(): Promise<EnumEducationLevelResponseViewModel> {
        const response: EnumEducationLevelResponseViewModel = await http
            .get(`lookups/highest-education-levels`)
            .json();

        return response;
    }

    // get employment status list
    static async getEnumEmploymentStatusList(): Promise<EnumEmploymentStatusResponseViewModel> {
        const response: EnumEmploymentStatusResponseViewModel = await http
            .get(`lookups/employment-statuses`)
            .json();

        return response;
    }

    // get ethnicity list
    static async getEnumEthnicityList(): Promise<EnumEthnicityResponseViewModel> {
        const response: EnumEthnicityResponseViewModel = await http
            .get(`lookups/ethnicities`)
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
    
    // get grade list
    static async getEnumGradeList(): Promise<EnumGradeResponseViewModel> {
        const response: EnumGradeResponseViewModel = await http
            .get(`lookups/grades`)
            .json();

        return response;
    }

    // get id type list - no folder in Postman
    // static async getEnumLoginIDTypeList(): Promise<EnumLoginIDTypeResponseViewModel> {
    //     const response: EnumLoginIDTypeResponseViewModel = await http
    //         .get(`lookups/highest-education-levels`)
    //         .json();

    //     return response;
    // }

    // get institutions list
    static async getEnumInstitutionList(): Promise<EnumInstituionResponseViewModel> {
        const response: EnumInstituionResponseViewModel = await http
            .get(`lookups/institutions`)
            .json();

        return response;
    }

    // get major and Minor list
    static async getEnumMajorMinorList(): Promise<EnumMajorMinorResponseViewModel> {
        const response: EnumMajorMinorResponseViewModel = await http
            .get(`lookups/major-minors`)
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

    // get nationality list
    static async getEnumNationalityList(): Promise<EnumNationalityResponseViewModel> {
        const response: EnumNationalityResponseViewModel = await http
            .get(`lookups/nationalities`)
            .json();

        return response;
    }

    // get placement list
    static async getEnumPlacementList(): Promise<EnumPlacementResponseViewModel> {
        const response: EnumPlacementResponseViewModel = await http
            .get(`lookups/placements`)
            .json();

        return response;
    }
    
    // get position list
    static async getEnumPositionList(): Promise<EnumPositionResponseViewModel> {
        const response: EnumPositionResponseViewModel = await http
            .get(`lookups/positions`)
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

    // get relationship list
    static async getEnumRelationshipList(): Promise<EnumRelationshipResponseViewModel> {
        const response: EnumRelationshipResponseViewModel = await http
            .get(`lookups/relationships`)
            .json();

        return response;
    }

    // get religion list
    static async getEnumReligionList(): Promise<EnumReligionResponseViewModel> {
        const response: EnumReligionResponseViewModel = await http
            .get(`lookups/religions`)
            .json();

        return response;
    }

    // get role list
    static async getEnumRoleList(): Promise<EnumRoleResponseViewModel> {
        const response: EnumRoleResponseViewModel = await http
            .get(`lookups/roles`)
            .json();

        return response;
    }

    // get scheme of service list
    static async getEnumSchemeOfServiceList(): Promise<EnumSchemeOfServiceResponseViewModel> {
        const response: EnumSchemeOfServiceResponseViewModel = await http
            .get(`lookups/scheme-of-services`)
            .json();

        return response;
    }
   
    // get section list
    static async getEnumSectionList(): Promise<EnumSectionResponseViewModel> {
        const response: EnumSectionResponseViewModel = await http
            .get(`lookups/sections`)
            .json();

        return response;
    }

    // get service class list
    static async getEnumServiceClassList(): Promise<EnumServiceClassResponseViewModel> {
        const response: EnumServiceClassResponseViewModel = await http
            .get(`lookups/service-classes`)
            .json();

        return response;
    }
    
    // get service group list
    static async getEnumServiceGroupList(): Promise<EnumServiceGroupResponseViewModel> {
        const response: EnumServiceGroupResponseViewModel = await http
            .get(`lookups/service-groups`)
            .json();

        return response;
    }
  
    // get service type list
    static async getEnumServiceTypeList(): Promise<EnumServiceTypeResponseViewModel> {
        const response: EnumServiceTypeResponseViewModel = await http
            .get(`lookups/service-types`)
            .json();

        return response;
    }

    // get sponsorships list
    static async getEnumSponsorshipList(): Promise<EnumSponsorshipResponseViewModel> {
        const response: EnumSponsorshipResponseViewModel = await http
            .get(`lookups/sponsorships`)
            .json();

        return response;
    }

    // get state list
    static async getEnumStateList(): Promise<EnumStateResponseViewModel> {
        const response: EnumStateResponseViewModel = await http
            .get(`lookups/states`)
            .json();

        return response;
    }

    // get title list
    static async getEnumTitleList(): Promise<EnumTitleResponseViewModel> {
        const response: EnumTitleResponseViewModel = await http
            .get(`lookups/titles`)
            .json();

        return response;
    }
    
    // get unit list
    static async getEnumUnitList(): Promise<EnumUnitResponseViewModel> {
        const response: EnumUnitResponseViewModel = await http
            .get(`lookups/units`)
            .json();

        return response;
    }
}
