<script lang="ts">
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import { _updatePasswordSchema, _submit } from './+page';

    export let data: PageData;

    const { form, errors, enhance } = superForm(data.form, {
        SPA: true,
        validators: _updatePasswordSchema,
        onUpdate() {},
        onSubmit() {
            _submit($form);
        },
    });
</script>

<div class="flex h-fit w-full flex-row items-center justify-between px-2 py-5">
    <span class="text-xl font-semibold leading-loose">
        Kemaskini Kata Laluan
    </span>
    <a
        href="/tetapan"
        class=" text-sm font-medium text-ios-labelColors-link-light hover:underline"
        >Kembali</a
    >
</div>

<div class="flex w-full flex-col justify-start space-y-4">
    <div class="h-fit w-full p-2">
        <span class="text-base">
            Kata laluan telah berjaya dikemaskini!
        </span>
    </div>
</div>
