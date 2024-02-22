<!-- Unguarded Modules Layout -->
<script lang="ts">
    import { Toaster } from 'svelte-french-toast';
</script>

<!-- page section starts here -->
<section
    class="h-screen min-h-screen w-screen bg-ios-basic-lightBackgroundGray"
>
    <!-- wrapper starts here -->
    <div
        class="mx-auto flex h-[calc(100vh-40px)] w-full flex-col items-center justify-center gap-2"
    >
        <!-- lkim logo wrapper starts here -->
        <!-- <div class="flex w-full flex-row items-center justify-center">
            <img src={mypsmLogo} class="h-8 object-scale-down" alt="logo" />
        </div> -->
        <!-- lkim logo wrapper ends here -->

        <!-- login card starts here -->
        <slot />
        <!-- login card ends here -->
    </div>
    <!-- wrapper ends here -->

    <!-- footer starts here -->
    <footer class="h-10 text-center">
        <div
            class="flex h-10 flex-row items-center justify-center text-center text-base text-ios-labelColors-secondaryLabel-light"
        >
            © 2024 Hak Cipta:
            <a href="https://www.lkim.gov.my/en/"
                >Lembaga Kemajuan Ikan Malaysia</a
            >
        </div>
    </footer>
    <!-- footer ends here -->
</section>

<Toaster></Toaster>
