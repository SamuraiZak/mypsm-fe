// ===============================================================
// Lookup Services
// ===============================================================

import { LookupConstantURL } from "$lib/constants/core/lookup-url-constant";
import { CommonResponseConvert } from "$lib/dto/core/common/common-response.dto";
import type { LookupDTO } from "$lib/dto/core/lookup/lookup.dto";
import { LookupHelper } from "$lib/helper/core/lookup-helper/lookup-helper";
import http from "$lib/services/provider/service-provider.service";
import type { Input } from "ky";

export class LookupServices {

    public static async getLookup(params:
        'agency-group' |
        'asset-declaration-status' |
        'award-category' |
        'award' | 'city' |
        'country' |
        "employment-status" |
        'ethnicity' |
        'gender' |
        'highest-education-level' |
        'institution' |
        'major-minor' |
        'marital-status' |
        'nationality' |
        'race' |
        'relationship' |
        'religion' |
        'scheme-of-service' |
        'service-class' |
        'sponsorship' |
        'state' |
        'title' |
        'role' |
        'service-group' |
        'service-type' |
        'grade' |
        'position' |
        'section' |
        'unit' |
        'division' |
        'district' |
        'department' |
        'placement'
    ) {

        // set the url
        let url: Input = ""

        switch (params) {
            case "agency-group":
                url = LookupConstantURL.agencyGroup
                break;
            
            case "asset-declaration-status":
                url = LookupConstantURL.assestDeclarationStatus
                break;
            
            case "award-category":
                url = LookupConstantURL.awardCategory
                break;
            
            case "award":
                url = LookupConstantURL.award
                break;
            
            case "country":
                url = LookupConstantURL.country
                break;
            
            case "employment-status":
                url = LookupConstantURL.employmentStatus
                break;
            
            case "ethnicity":
                url = LookupConstantURL.ethnicity
                break;
            
            case "gender":
                url = LookupConstantURL.gender
                break;
            
            case "highest-education-level":
                url = LookupConstantURL.highestEducationLevel
                break;
            
            case "institution":
                url = LookupConstantURL.institution
                break;
            
            case "major-minor":
                url = LookupConstantURL.majorMinor
                break;
            
            case "marital-status":
                url = LookupConstantURL.maritalStatus
                break;
            
            case "nationality":
                url = LookupConstantURL.agencyGroup
                break;
            
            case "race":
                url = LookupConstantURL.agencyGroup
                break;
            
            case "relationship":
                url = LookupConstantURL.agencyGroup
                break;
            
            case "religion":
                url = LookupConstantURL.agencyGroup
                break;
            
            case "scheme-of-service":
                url = LookupConstantURL.agencyGroup
                break;
            
            case "service-class":
                url = LookupConstantURL.agencyGroup
                break;
            
            case "sponsorship":
                url = LookupConstantURL.agencyGroup
                break;
            
            case "state":
                url = LookupConstantURL.agencyGroup
                break;
            
            case "title":
                url = LookupConstantURL.agencyGroup
                break;
            
            case "role":
                url = LookupConstantURL.agencyGroup
                break;
            
            case "service-group":
                url = LookupConstantURL.agencyGroup
                break;
            
            case "service-type":
                url = LookupConstantURL.agencyGroup
                break;
            
            case "grade":
                url = LookupConstantURL.agencyGroup
                break;
            
            case "position":
                url = LookupConstantURL.agencyGroup
                break;
            
            case "section":
                url = LookupConstantURL.agencyGroup
                break;
            
            case "unit":
                url = LookupConstantURL.agencyGroup
                break;
            
            case "division":
                url = LookupConstantURL.agencyGroup
                break;
            
            case "district":
                url = LookupConstantURL.agencyGroup
                break;
            
            case "department":
                url = LookupConstantURL.agencyGroup
                break;
            
            case "placement":
                url = LookupConstantURL.agencyGroup
                break;

            default:
                break;
        }

        // fetch data
        const response: Response = await http.get(url).json();

        const result = CommonResponseConvert.fromResponse(response);
        const listResult: LookupDTO[] = result.data?.dataList as LookupDTO[];

        return listResult;
    }

    public static async getLookupToDropdown(params:
        'agency-group' |
        'asset-declaration-status' |
        'award-category' |
        'award' | 'city' |
        'country' |
        "employment-status" |
        'ethnicity' |
        'gender' |
        'highest-education-level' |
        'institution' |
        'major-minor' |
        'marital-status' |
        'nationality' |
        'race' |
        'relationship' |
        'religion' |
        'scheme-of-service' |
        'service-class' |
        'sponsorship' |
        'state' |
        'title' |
        'role' |
        'service-group' |
        'service-type' |
        'grade' |
        'position' |
        'section' |
        'unit' |
        'division' |
        'district' |
        'department' |
        'placement'
    ) {

        // set the url
        let url: Input = ""

        switch (params) {
            case "agency-group":
                url = LookupConstantURL.agencyGroup
                break;
            
            case "asset-declaration-status":
                url = LookupConstantURL.assestDeclarationStatus
                break;
            
            case "award-category":
                url = LookupConstantURL.awardCategory
                break;
            
            case "award":
                url = LookupConstantURL.award
                break;
            
            case "country":
                url = LookupConstantURL.country
                break;
            
            case "employment-status":
                url = LookupConstantURL.employmentStatus
                break;
            
            case "ethnicity":
                url = LookupConstantURL.ethnicity
                break;
            
            case "gender":
                url = LookupConstantURL.gender
                break;
            
            case "highest-education-level":
                url = LookupConstantURL.highestEducationLevel
                break;
            
            case "institution":
                url = LookupConstantURL.institution
                break;
            
            case "major-minor":
                url = LookupConstantURL.majorMinor
                break;
            
            case "marital-status":
                url = LookupConstantURL.maritalStatus
                break;
            
            case "nationality":
                url = LookupConstantURL.agencyGroup
                break;
            
            case "race":
                url = LookupConstantURL.agencyGroup
                break;
            
            case "relationship":
                url = LookupConstantURL.agencyGroup
                break;
            
            case "religion":
                url = LookupConstantURL.agencyGroup
                break;
            
            case "scheme-of-service":
                url = LookupConstantURL.agencyGroup
                break;
            
            case "service-class":
                url = LookupConstantURL.agencyGroup
                break;
            
            case "sponsorship":
                url = LookupConstantURL.agencyGroup
                break;
            
            case "state":
                url = LookupConstantURL.agencyGroup
                break;
            
            case "title":
                url = LookupConstantURL.agencyGroup
                break;
            
            case "role":
                url = LookupConstantURL.agencyGroup
                break;
            
            case "service-group":
                url = LookupConstantURL.agencyGroup
                break;
            
            case "service-type":
                url = LookupConstantURL.agencyGroup
                break;
            
            case "grade":
                url = LookupConstantURL.agencyGroup
                break;
            
            case "position":
                url = LookupConstantURL.agencyGroup
                break;
            
            case "section":
                url = LookupConstantURL.agencyGroup
                break;
            
            case "unit":
                url = LookupConstantURL.agencyGroup
                break;
            
            case "division":
                url = LookupConstantURL.agencyGroup
                break;
            
            case "district":
                url = LookupConstantURL.agencyGroup
                break;
            
            case "department":
                url = LookupConstantURL.agencyGroup
                break;
            
            case "placement":
                url = LookupConstantURL.agencyGroup
                break;

            default:
                break;
        }

        // fetch data
        const response: Response = await http.get(url).json();

        const result = CommonResponseConvert.fromResponse(response);
        const lookupList: LookupDTO[] = result.data?.dataList as LookupDTO[];

        const dropdownList = LookupHelper.toDropdown(lookupList);
        
        return dropdownList;
    }
}