<script lang="ts">
    import { dateProxy, superForm } from 'sveltekit-superforms/client';
    import type { PageData } from '../../(development-copy)/playground/$types';
    import { _playgroundUserSchema, _submit } from './+page';
    import { Toaster } from 'svelte-french-toast';

    export let data: PageData;

    const { form, errors, enhance } = superForm(data.form, {
        validators: _playgroundUserSchema,
        taintedMessage: false,
        validationMethod: 'auto',
        onSubmit() {
            _submit($form);
        },
    });

    const proxyBirthdate = dateProxy(form, 'birthDate', { format: 'date' });
</script>

<div class="flex justify-center">
    <form method="POST" use:enhance class="flex flex-col gap-5">
        <div class="flex flex-col gap-y-5">
            <label class="flex flex-col gap-2" for="name"
                >Name
                <input type="text" bind:value={$form.name} />
                {#if $errors.name}
                    {$errors.name}{/if}
            </label>
            <label class="flex flex-col gap-2" for="name"
                >IC
                <input type="number" bind:value={$form.identityNumber} />
                {#if $errors.identityNumber}
                    {$errors.identityNumber}{/if}
            </label>
            <label class="flex flex-col gap-2" for="name"
                >Birthdate
                <input type="date" bind:value={$proxyBirthdate} />
                {#if $errors.birthDate}
                    {$errors.birthDate}{/if}
            </label>
            <label class="flex flex-row items-center gap-2" for="name"
                >Married?
                <input
                    type="radio"
                    name="isMarried"
                    bind:group={$form.isMarried}
                    value={true}
                />
                <input
                    type="radio"
                    name="isMarried"
                    bind:group={$form.isMarried}
                    value={false}
                />
                value: {$form.isMarried ? 'Married' : 'Not Married'}
            </label>
            <label class="flex flex-col gap-2" for="name"
                >Spouse Name
                <input type="text" bind:value={$form.spouseName} />
                {#if $errors.spouseName}
                    {$errors.spouseName}{/if}
            </label>
            <button
                class="m-5 rounded-full bg-slate-600 px-4 text-white active:scale-[0.98]"
                >Submit</button
            >
        </div>
    </form>
</div>

<Toaster />
