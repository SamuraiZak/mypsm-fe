
import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key-constant';
import { writable } from 'svelte/store';

const defaultValue = 'kakitangan';
// const initialValue = browser
//     ? window.localStorage.getItem('currentRole') ?? defaultValue
//     : defaultValue;

const initialValue = localStorage.getItem(LocalStorageKeyConstant.currentRole)??defaultValue;

const currentRole = writable<string>(initialValue);

currentRole.subscribe((value) => {
    localStorage.setItem(LocalStorageKeyConstant.currentRole, value);
});

export default currentRole;
