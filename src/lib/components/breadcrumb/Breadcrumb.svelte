<script lang="ts">
    import { breadCrumb, currentPage } from '$lib/stores/globalState';

    $: breads = $breadCrumb;

    function capitalizeFirstLetter(str: string): string {
        const words = str.split('-');
        const capitalizedWords = words.map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1),
        );
        return capitalizedWords.join(' ');
    }

    function prettifyPath(str: string) {
        let strDash: string[] = str.split('-');
        for (let i = 0; i < strDash.length; i++) {
            if (strDash[i].includes('_')) {
                let strUnderscore: string[] = strDash[i].split('_');

                for (let j = 0; j < strUnderscore.length; j++) {
                    strUnderscore[j] =
                        strUnderscore[j].charAt(0).toUpperCase() +
                        strUnderscore[j].slice(1);
                }
                strDash[i] = strUnderscore.join(' - ');
            } else {
                strDash[i] =
                    strDash[i].charAt(0).toUpperCase() + strDash[i].slice(1);
            }
        }

        return strDash.join(' ');
    }
</script>

<div
    class="flex h-full w-full shrink grow basis-0 flex-col items-center justify-center"
>
    <div
        class="flex h-[15px] flex-row items-center justify-start gap-2 self-stretch"
    >
        {#each breads as item, i}
            <span class="text-[12px] font-medium text-txt-tertiary"
                >{prettifyPath(item)}</span
            >
            {#if i + 1 < breads.length}
                <span class="text-[12px] font-medium text-txt-tertiary"
                    ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="h-3 w-3"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                    </svg>
                </span>
            {/if}
        {/each}
    </div>
</div>
