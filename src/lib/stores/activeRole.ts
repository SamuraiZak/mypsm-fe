import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const defaultValue = 'kakitangan';
const initialValue = browser
    ? window.localStorage.getItem('currentRole') ?? defaultValue
    : defaultValue;

const currentRole = writable<string>(initialValue);

currentRole.subscribe((value) => {
    if (browser) {
        window.localStorage.setItem('currentRole', value);
    }
});

export default currentRole;
