<script lang="ts">
    import TextIconButton from '../button/TextIconButton.svelte';
    import FilterTextField from './filter/FilterTextField.svelte';

    // table id
    export let tableId = 'tableId';

    // table title
    export let title = 'tableTitle';

    // data to be bind when clicking on details or add
    export let passData: any = {};

    // callback funcitons to handle sort and pagination actions
    export let onUpdate = () => {};

    export let actions = {
        detailActions: () => {},
        selectActions: () => {},
        editActions: () => {},
    };

    export let options = {
        add: false,
        detail: false,
        select: false,
        edit: false,
    };

    const pageSizeOption = [
        {
            key: 5,
            value: 5,
        },
        {
            key: 10,
            value: 10,
        },
        {
            key: 15,
            value: 15,
        },
        {
            key: 20,
            value: 20,
        },
        {
            key: 50,
            value: 50,
        },
        {
            key: 100,
            value: 100,
        },
    ];
</script>

<div
    class="flex h-full max-h-full w-full resize-none flex-col justify-start overflow-hidden"
>
    <!-- header -->
    <div
        class="flex h-10 max-h-10 min-h-10 w-full flex-row items-center justify-between"
    >
        <!-- leading -->
        <div class="flex h-fit w-fit flex-row items-center justify-start">
            <p>Table Header</p>
        </div>
        <!-- trailing -->
        <div class="flex h-fit w-fit flex-row items-center justify-start">
            <TextIconButton label="PDF" type="light"></TextIconButton>
        </div>
    </div>

    <!-- table wrapper -->
    <div
        class="flex h-full max-h-full w-full resize-none flex-col justify-start overflow-hidden rounded border bg-ios-basic-white"
    >
        <!-- filter area -->
        <div
            class="flex h-fit min-h-10 w-full flex-row items-start justify-between border-b bg-ios-basic-white p-2"
        >
            <div
                class=" flex h-fit min-h-10 w-full flex-row flex-wrap items-end justify-start gap-1"
            >
                <FilterTextField></FilterTextField>
                <FilterTextField></FilterTextField>
                <FilterTextField></FilterTextField>

                <div class="flex h-[44.5px] w-fit flex-col justify-end px-2">
                    <TextIconButton label="Cari" icon="search" type="primary"
                    ></TextIconButton>
                </div>
            </div>
            <div
                class="flex h-fit min-h-10 w-fit flex-row items-start justify-end gap-2"
            ></div>
        </div>
    </div>
</div>
