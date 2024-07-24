<script lang="ts">
    import { ComponentHelper } from '$lib/helpers/core/component.helper';
    import { onMount } from 'svelte';
    let childrenList: any;
    export let stepperId: string = "stepper";
    onMount(() => {
        childrenList = document.getElementById(stepperId);
        childrenList.id = childrenList.children[0].id;
    });
</script>

<div
    class="stepper-content flex h-full max-h-full w-full max-w-[calc(100vw-490px)] flex-col justify-start"
    id={stepperId}
>
    <!-- content header -->
    <slot />

    <!-- <div
        class="flex h-full max-h-full w-full flex-row items-center justify-start overflow-y-auto p-2.5"
    ></div> -->
</div>
