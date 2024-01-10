<script lang="ts">
    import type { PageData } from './$types';
    import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
    import {
        superForm,
        setMessage,
        setError,
    } from 'sveltekit-superforms/client';
    import { _userSchema } from './+page';

    export let data: PageData;

    const { form, errors, message, constraints, enhance } = superForm(
        data.form,
        {
            SPA: true,
            validators: _userSchema,
            onUpdate({ form }) {
                // Form validation
                if (form.data.email.includes('spam')) {
                    setError(form, 'email', 'Suspicious email address.');
                } else if (form.valid) {
                    // TODO: Do something with the validated form.data
                    setMessage(form, 'Valid data!');
                }
            },
        },
    );
</script>

<h1>Edit user</h1>

{#if $message}<h3>{$message}</h3>{/if}

<SuperDebug data={$form} />

<form method="POST" use:enhance>
    <label>
        Name<br />
        <input
            aria-invalid={$errors.name ? 'true' : undefined}
            bind:value={$form.name}
            {...$constraints.name}
        />
    </label>
    {#if $errors.name}<span class="invalid">{$errors.name}</span>{/if}

    <label>
        E-mail<br />
        <input
            type="email"
            aria-invalid={$errors.email ? 'true' : undefined}
            bind:value={$form.email}
            {...$constraints.email}
        />
    </label>
    {#if $errors.email}<span class="invalid">{$errors.email}</span>{/if}

    <button>Submit</button>
</form>
