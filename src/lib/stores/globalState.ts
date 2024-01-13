import { writable, type Writable } from 'svelte/store';

export const defaultRole = 'kakitangan';

export const activeRole = writable(defaultRole);

export const defaultPage = 'Dashboard';

export const currentPage = writable(defaultPage);

export const breadCrumb = writable(['']);

export const drawerFull = writable(true);

export const ssClaimList = writable([]);

export const fileSelectionList: Writable<File[]> = writable([]);

export const selectedRecordId: Writable<number> = writable();

export const selectedPatientTreatmentId: Writable<string> = writable();

export const showLoadingOverlay: Writable<boolean> = writable();
