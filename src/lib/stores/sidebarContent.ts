import { writable } from 'svelte/store'
import { sidebarDefault } from '$lib/config/sidebar/sidebar-default';

type TabItem = { name: string; redirect?: string };
type SidebarType = TabItem & { dropdown?: TabItem[] };

export const sidebarContent = writable<SidebarType[]>(sidebarDefault);