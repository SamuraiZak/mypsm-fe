import type { ModuleDTO } from '$lib/dto/core/setup/setup.dto';
import { UserRoleConstant } from './user-role.constant';

export class ModuleConstant {
    public static homePage: ModuleDTO = {
        name: 'Halaman Utama',
        url: '/halaman-utama',
        roles: [],
    };

    public static accountSetting: ModuleDTO = {
        name: 'Tetapan Akaun',
        url: 'abc',
        roles: [],
    };

    public static systemManagement: ModuleDTO = {
        name: 'Pengurusan Sistem',
        url: 'abc',
        roles: [UserRoleConstant.admin],
    };

    public static profile: ModuleDTO = {
        name: 'Profil',
        url: 'abc',
        roles: [UserRoleConstant.kakitangan],
    };

    public static employment: ModuleDTO = {
        name: 'Perjawatan',
        url: 'abc',
        roles: [
            UserRoleConstant.kakitangan,
            UserRoleConstant.urusSetiaPerjawatan,
            UserRoleConstant.pelulus,
            UserRoleConstant.penyokong,
        ],
        subModules: [
            {
                name: 'Lantikan Baru',
                url: 'abc',
                roles: [],
            },
            {
                name: 'Pengesahan Dalam Perkhidmatan',
                url: 'abc',
                roles: [],
            },
            {
                name: 'Lantikan Baru',
                url: 'abc',
                roles: [],
            },
            {
                name: 'Lantikan Baru',
                url: 'abc',
                roles: [],
            },
            {
                name: 'Lantikan Baru',
                url: 'abc',
                roles: [],
            },
            {
                name: 'Lantikan Baru',
                url: 'abc',
                roles: [],
            },
            {
                name: 'Lantikan Baru',
                url: 'abc',
                roles: [],
            },
            {
                name: 'Lantikan Baru',
                url: 'abc',
                roles: [],
            },
            {
                name: 'Lantikan Baru',
                url: 'abc',
                roles: [],
            },
            {
                name: 'Lantikan Baru',
                url: 'abc',
                roles: [],
            },
        ],
    };
}
