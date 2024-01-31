<script lang="ts">
    import { afterUpdate, onMount } from 'svelte';
    import TabButton from './TabButton.svelte';

    export let activeIndex = 0;
    let contentList: any;
    let tabList: any[] = [];
    let tempTabList: any[] = [];

    // Run logic whenever activeTab changes
    afterUpdate(() => {
        if (contentList) {
            for (let index = 0; index < contentList.children.length; index++) {
                if (index !== activeIndex) {
                    contentList.children[index].classList.add('hidden');
                } else {
                    contentList.children[index].classList.remove('hidden');
                }
            }
        }
    });

    onMount(() => {
        contentList = document.getElementById('tab-list');
        for (let index = 0; index < contentList.children.length; index++) {
            tempTabList.push(contentList.children[index].id);
        }

        tabList = tempTabList;
    });

    function setActiveTab(index: number) {
        activeIndex = index;
    }
</script>

<div
    class="flex h-full max-h-[calc(100vh-172px)] w-full max-w-[calc(100vw-200px)] flex-col items-center justify-start bg-bgr-primary"
>
    <div
        class="flex h-[40px] max-h-[40px] min-h-[40px] w-full flex-row items-center justify-start border-b border-bdr-primary bg-bgr-primary"
    >
        {#each tabList as item, index}
            <TabButton
                label={item}
                active={activeIndex == index}
                onClick={() => {
                    setActiveTab(index);
                }}
            ></TabButton>
        {/each}
    </div>

    <ul
        id="tab-list"
        class="h-full max-h-full w-full max-w-full overflow-hidden"
    >
        <slot />
    </ul>
</div>
