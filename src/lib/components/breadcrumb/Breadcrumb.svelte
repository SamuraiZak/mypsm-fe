<script lang="ts">
    import { page } from '$app/stores';
    import SvgChevronRight from '$lib/assets/svg/SvgChevronRight.svelte';

    let crumbs: Array<{ label: string; href: string }> = [];

    $: {
        // Remove zero-length - tokens.
        const tokens = $page.url.pathname.split('/').filter((t) => t !== '');

        // Create {label, href} pairs for each token.
        let tokenPath = '';

        crumbs = tokens.map((t) => {
            tokenPath += '/' + t;
            t = t.charAt(0).toUpperCase() + t.slice(1);
            t = t.replaceAll('_', ' ')
            return { label: t, href: tokenPath };
        });
    }
</script>

<div class="flex flex-row items-center justify-start gap-2">
    {#each crumbs as c, i}
        <span class="text-base text-ios-labelColors-secondaryLabel-light select-none">
            {c.label}
        </span>
        {#if i !== crumbs.length - 1}
            <span class="text-ios-labelColors-secondaryLabel-light select-none">
                <SvgChevronRight size="14"></SvgChevronRight>
            </span>
        {/if}
    {/each}
</div>
