import { goto } from '$app/navigation';
import { redirect } from '@sveltejs/kit';

export function load() {
    goto('/log-masuk');
}
