<script lang="ts">
    import SideStepper from '$lib/components/side-stepper/SideStepperItem.svelte';
    let activeStepper = '0';
</script>

<div class="m-5 flex flex-row gap-2">
    <h1>Default:</h1>
    <SideStepper label="Maklumat Kakitangan" />
    <h1>Active:</h1>
    <SideStepper label="Maklumat Kakitangan" active />
    <h1>Toggling:</h1>
    <div class="flex flex-col gap-3">
        <SideStepper
            label="Maklumat Kakitangan"
            id="0"
            active={activeStepper === '0'}
            onClick={() => {
                activeStepper = '0';
            }}
        /><SideStepper
            label="Maklumat Perkhidmatan"
            id="1"
            active={activeStepper === '1'}
            onClick={() => {
                activeStepper = '1';
            }}
        /><SideStepper
            label="Senarai Peperiksaan Perkhidmatan / Kursus Induksi "
            id="2"
            active={activeStepper === '2'}
            onClick={() => {
                activeStepper = '2';
            }}
        />
    </div>
</div>
