import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { SidebarConstant } from '$lib/constants/core/sidebar.constant';
import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
import type { NavItem, SidebarDTO } from '$lib/dto/core/sidebar/sidebar.dto';
import { redirect } from '@sveltejs/kit';

const authorisedRoleCode: string[] = [
    UserRoleConstant.calon.code,
    UserRoleConstant.kakitangan.code,
];

export const load = async () => {
    const currentRoleCode = localStorage.getItem(
        LocalStorageKeyConstant.currentRoleCode,
    );

    const navigationList: NavItem[] =
        SidebarConstant.sidebar.find((item) => item.role == currentRoleCode)
            ?.navItems ?? [];

    return {
        props: {
            navigationList,
        },
    };
};
