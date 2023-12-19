/* eslint-disable @typescript-eslint/no-unused-vars */
interface SidebarType extends TabItem {
    dropdown?: TabItem[];
}

interface TabItem {
    name: string;
    redirect?: string;
    dropdown?: TabItem[];
}