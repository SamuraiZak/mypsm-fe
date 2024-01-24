// ===============================================================
// Lookup Services
// ===============================================================

import http from "$lib/services/provider/service-provider.service";
import { EnumAgencyGroupConvert } from "$lib/view-models/core/lookup/agency-group/agency-group-senum.view-model";
import { EnumAssetDeclarationStatusResponseConvert } from "$lib/view-models/core/lookup/asset-declaration/asset-declaration-enum.view-model";
import { EnumLoginIDTypeResponseConvert } from "$lib/view-models/core/lookup/id-type/id-type-enum-response.view-model";
import { IDTypeListConvert } from "$lib/view-models/core/lookup/lookup-id-type-list-response.view-model";
import { RoleListConvert } from "$lib/view-models/core/lookup/lookup-role-list-response.view-model";

export class LookupService{

    // get list of agency group
    static async getEnumAgencyGroup(){

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
    static async getEnumAssetDeclarationStatus(){

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

    // get list of login id type
    static async getEnumLoginIdType(){
        const response: Response = await http.get('lookups/idType').json();

        return EnumLoginIDTypeResponseConvert.fromResponse(response);
    }

}