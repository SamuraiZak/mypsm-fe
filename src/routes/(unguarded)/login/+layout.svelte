<script lang="ts">
    import mypsmLogo from '$lib/assets/MyPSM.png';
    import lkimLogo from '$lib/assets/logo.png';
</script>

<section class="bg-ios-backgroundColors-secondarySystemBackground-light">
    <div
        class="mx-auto flex h-screen flex-col items-center justify-center"
    >
        <div class="mb-2.5 flex items-center">
            <img class="w-16 object-scale-down" src={lkimLogo} alt="logo" />
        </div>
        <slot />
    </div>
</section>
