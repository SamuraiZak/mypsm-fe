// ===============================================================
// Lookup Services
// ===============================================================

import { LookupConstantURL } from "$lib/constants/core/lookup-url-constant";
import { CommonResponseConvert } from "$lib/dto/core/common/common-response.dto";
import type { LookupDTO } from "$lib/dto/core/lookup/lookup.dto";
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

                case "city":
                url = LookupConstantURL.city
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
                url = LookupConstantURL.nationality
                break;

            case "race":
                url = LookupConstantURL.race
                break;

            case "relationship":
                url = LookupConstantURL.relationship
                break;

            case "religion":
                url = LookupConstantURL.religion
                break;

            // case "scheme-of-service":
            //     url = LookupConstantURL.schemeOfService
            //     break;

            case "service-class":
                url = LookupConstantURL.serviceClass
                break;

            case "sponsorship":
                url = LookupConstantURL.sponsorship
                break;

            case "state":
                url = LookupConstantURL.state
                break;

            case "title":
                url = LookupConstantURL.title
                break;

            case "role":
                url = LookupConstantURL.role
                break;

            case "service-group":
                url = LookupConstantURL.serviceGroup
                break;

            case "service-type":
                url = LookupConstantURL.serviceType
                break;

            case "grade":
                url = LookupConstantURL.grade
                break;

            case "position":
                url = LookupConstantURL.position
                break;

            case "section":
                url = LookupConstantURL.section
                break;

            case "unit":
                url = LookupConstantURL.unit
                break;

            case "division":
                url = LookupConstantURL.division
                break;

            case "district":
                url = LookupConstantURL.district
                break;

            case "department":
                url = LookupConstantURL.department
                break;

            case "placement":
                url = LookupConstantURL.placement
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

}
