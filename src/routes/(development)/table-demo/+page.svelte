<script lang="ts">
    import CommonTable from '$lib/components/common-table/CommonTable.svelte';
    import FormTable from '$lib/components/form-table/FormTable.svelte';
    import type { IDependence } from '$lib/interfaces/database/test';
    import { mockEmploymentPositionHistories } from '$lib/mocks/database/employmentPositionHistories';
    let sampleData: IDependence = {
        id: 0,
        employeeNumber: '',
        name: '',
        age: 0,
        relationship: '',
    };

    let myData: any[] = [{ ...sampleData }];
</script>

<section class="h-screen w-screen bg-bgr-primary">
    <div class="flex h-screen w-screen flex-col items-start justify-start">
        <!-- header -->
        <FormTable {sampleData} bind:data={myData}></FormTable>
    </div>
    <button
        on:click={() => {
            console.log(myData);
        }}
    >
        show
    </button>
</section>
