import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';

export class PermissionConstant {
    public static employee: LookupDTO = {
        id: 1,
        code: 'employee',
        description: 'employee',
    };
    public static secretary: LookupDTO = {
        id: 2,
        code: 'secretary',
        description: 'secretary',
    };
    public static director: LookupDTO = {
        id: 3,
        code: 'director',
        description: 'director',
    };
    public static headOfDirector: LookupDTO = {
        id: 4,
        code: 'headOfDirector',
        description: 'headOfDirector',
    };
    public static supporter: LookupDTO = {
        id: 5,
        code: 'supporter',
        description: 'supporter',
    };
    public static approver: LookupDTO = {
        id: 6,
        code: 'approver',
        description: 'approver',
    };
    public static management: LookupDTO = {
        id: 7,
        code: 'management',
        description: 'management',
    };
    public static admin: LookupDTO = {
        id: 8,
        code: 'admin',
        description: 'admin',
    };

    public static list: LookupDTO[] = [
        this.employee,
        this.secretary,
        this.director,
        this.headOfDirector,
        this.supporter,
        this.approver,
        this.management,
        this.admin,
    ];
}
