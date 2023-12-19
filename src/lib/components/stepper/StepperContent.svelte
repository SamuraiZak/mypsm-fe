<script lang="ts">
    import { onMount } from 'svelte';
    let childrenList: any;
    onMount(() => {
        childrenList = document.getElementById('stepper');
        childrenList.id = childrenList.children[0].id;
    });
</script>

<div
    class="stepper-content flex h-full max-h-full w-full max-w-[calc(100vw-500px)] flex-col justify-start"
    id="stepper"
>
    <!-- content header -->
    <slot />

    <!-- <div
        class="flex h-full max-h-full w-full flex-row items-center justify-start overflow-y-auto p-2.5"
    ></div> -->
</div>
