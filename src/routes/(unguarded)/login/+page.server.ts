import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ cookies, request, url }) => {
        const data = await request.formData();
        if (
            data.get('usernameField') === 'admin' &&
            data.get('passwordField') === 'P@ssw0rd'
        ) {
            const id: string | undefined = cookies.get('userId');

            if (!id) {
                cookies.set('userId', crypto.randomUUID(), { path: '/' });
            }
            cookies.set('logged_in', 'true', {
                path: '/',
            });
            throw redirect(
                303,
                url.searchParams.get('redirectTo') ??
                    '/kakitangan/halaman-utama',
            );
        }
    },
};
