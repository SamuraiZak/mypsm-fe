// ===============================================================
// Lookup Item Constant
// ===============================================================

import type { LookupTypeDTO } from '$lib/dto/core/lookup/lookup-item.dto';

export class LookupItemConstant {
    public static department: LookupTypeDTO = {
        name: 'Jabatan',
        typeCode: '74cff215-8368-4a78-b7bc-9dc94e7722ca',
        get: 'service_lookup/departments',
        filterUrl: 'service_lookup/departments/filter',
        add: 'service_lookup/departments/add',
        edit: 'aservice_lookup/departments/edit',
    };
    public static employmentStatus: LookupTypeDTO = {
        name: 'Status_Lantikan',
        typeCode: 'b836cc52-c5d2-47d8-a44e-0ef56eb20e6c',
        get: 'service_lookup/employment_statuses',
        filterUrl: 'service_lookup/employment_statuses/filter',
        add: 'service_lookup/employment_statuses/add',
        edit: 'service_lookup/employment_statuses/edit',
    };
    public static grade: LookupTypeDTO = {
        name: 'Gred_Jawatan',
        typeCode: '2969a17c-70b0-4c5d-b0a4-30191dad4362',
        get: 'service_lookup/grades',
        filterUrl: 'service_lookup/grades/filter',
        add: 'service_lookup/grades/add',
        edit: 'service_lookup/grades/edit',
    };
    public static placement: LookupTypeDTO = {
        name: 'Penempatan',
        typeCode: 'dfeb328f-0088-40ca-926a-10b060712c66',
        get: 'abcx',
        filterUrl: 'asdas',
        add: 'asdasd',
        edit: 'asdas',
    };
    public static programme: LookupTypeDTO = {
        name: 'Program',
        typeCode: '2bcf4684-97c1-493b-bfe7-f18dd8cb09d9',
        get: 'service_lookup/placements',
        filterUrl: 'service_lookup/placements/filter',
        add: 'service_lookup/placements/add',
        edit: 'service_lookup/placements/edit',
    };
    public static position: LookupTypeDTO = {
        name: 'Jawatan',
        typeCode: '7c80c9b8-5768-4011-8468-ebc86ebc7758',
        get: 'service_lookup/positions',
        filterUrl: 'service_lookup/positions/filter',
        add: 'service_lookup/positions/add',
        edit: 'service_lookup/positions/edit',
    };
    public static scheme: LookupTypeDTO = {
        name: 'Skim',
        typeCode: 'cfad3911-5c9a-4d7e-ae1f-20edd77da5e2',
        get: 'service_lookup/schemes',
        filterUrl: 'service_lookup/schemes/filter',
        add: 'service_lookup/schemes/add',
        edit: 'service_lookup/schemes/edit',
    };
    public static section: LookupTypeDTO = {
        name: 'Seksyen',
        typeCode: '699e4e9d-72ac-4caf-8988-9296d02fb877',
        get: 'service_lookup/sections',
        filterUrl: 'service_lookup/sections/filter',
        add: 'service_lookup/sections/add',
        edit: 'service_lookup/sections/edit',
    };
    public static serviceGroup: LookupTypeDTO = {
        name: 'Kumpulan_Perkhidmatan',
        typeCode: 'c861a524-ede7-4add-ab41-e5ef43a15cbb',
        get: 'service_lookup/service_groups',
        filterUrl: 'service_lookup/service_groups/filter',
        add: 'service_lookup/service_groups/add',
        edit: 'service_lookup/service_groups/edit',
    };
    public static serviceType: LookupTypeDTO = {
        name: 'Jenis_Perkhidmatan',
        typeCode: '096135e0-62a5-4f8c-87b7-c5a06136f71b',
        get: 'service_lookup/service_types',
        filterUrl: 'service_lookup/service_types/filter',
        add: 'service_lookup/service_types/add',
        edit: 'service_lookup/service_types/edit',
    };
    public static unit: LookupTypeDTO = {
        name: 'Unit',
        typeCode: 'ee61df68-ef6c-4920-948e-597f7424eb88',
        get: 'service_lookup/units',
        filterUrl: 'service_lookup/units/filter',
        add: 'service_lookup/units/add',
        edit: 'service_lookup/units/edit',
    };

    public static list: LookupTypeDTO[] = [
        this.department,
        this.employmentStatus,
        this.grade,
        this.placement,
        this.position,
        this.programme,
        this.scheme,
        this.section,
        this.serviceGroup,
        this.serviceType,
        this.unit,
    ];
}
