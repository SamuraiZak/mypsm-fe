// ===============================================================
// Sidebar DTO
// ===============================================================

export interface SidebarDTO {
    role: string;
    navItems: NavItem[];
}

export interface NavItem {
    name: string;
    path: string;
    subItems?: NavItem[];
}

// Converts JSON strings to/from your types
export class SidebarConvert {
    public static fromJson(json: string): SidebarDTO {
        return JSON.parse(json);
    }

    public static toJson(value: SidebarDTO): string {
        return JSON.stringify(value);
    }
}
