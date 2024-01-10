<script lang="ts">
    import mypsmLogo from '$lib/assets/MyPSM.png';
    import lkimLogo from '$lib/assets/logo.png';
</script>

<section class="bg-ios-backgroundColors-secondarySystemBackground-light">
    <div
        class="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0"
    >
        <div class="mb-6 flex items-center">
            <img class="h-20" src={lkimLogo} alt="logo" />
        </div>
        <slot />
    </div>
</section>
