<script lang="ts">
    export let label: string = 'Label';
    export let id: string = 'defaultId';
    export let selectedDate = '2022-02-02';
    export let handleDateChange: any;
</script>

<div class="flex flex-col items-center justify-center">
    <div class="flex w-full flex-row items-center justify-start">
        <p class="text-sm font-normal text-txt-secondary">{label}</p>
    </div>
    <div class="flex flex-row items-center justify-start">
        <input
            class="h-[28px] w-[200px] rounded-[3px] border-bdr-primary bg-bgr-primary text-sm hover:border-system-primary focus:outline-none focus:ring-0"
            type="date"
            name=""
            {id}
            on:change={handleDateChange}
            bind:value={selectedDate}
        />
    </div>
</div>
