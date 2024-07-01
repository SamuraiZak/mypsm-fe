<script lang="ts">
</script>

<div
    class="bg-custom-svg flex h-screen min-h-screen w-screen flex-col items-center justify-center"
>
    <slot />
    <footer class="flex h-14 w-full flex-col items-center justify-center">
        <p class="text text-base font-normal text-white">
            Sistem Pengurusan Sumber Manusia
        </p>
        <p class="text text-base font-normal text-white">
            2024 © Lembaga Kemajuan Ikan Malaysia (LKIM)
        </p>
    </footer>
</div>

<style lang="postcss">
    .bg-custom-svg {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1920' height='1080' preserveAspectRatio='none' viewBox='0 0 1920 1080'%3e%3cg mask='url(%26quot%3b%23SvgjsMask2658%26quot%3b)' fill='none'%3e%3crect width='1920' height='1080' x='0' y='0' fill='url(%26quot%3b%23SvgjsLinearGradient2659%26quot%3b)'%3e%3c/rect%3e%3cpath d='M2 1080L1082 0L1580 0L500 1080z' fill='url(%26quot%3b%23SvgjsLinearGradient2660%26quot%3b)'%3e%3c/path%3e%3cpath d='M653.6 1080L1733.6 0L2090.6 0L1010.6 1080z' fill='url(%26quot%3b%23SvgjsLinearGradient2660%26quot%3b)'%3e%3c/path%3e%3cpath d='M1820 1080L740 0L312.5 0L1392.5 1080z' fill='url(%26quot%3b%23SvgjsLinearGradient2661%26quot%3b)'%3e%3c/path%3e%3cpath d='M1199.4 1080L119.40000000000009 0L-188.0999999999999 0L891.9000000000001 1080z' fill='url(%26quot%3b%23SvgjsLinearGradient2661%26quot%3b)'%3e%3c/path%3e%3cpath d='M1242.6924324542472 1080L1920 402.6924324542472L1920 1080z' fill='url(%26quot%3b%23SvgjsLinearGradient2660%26quot%3b)'%3e%3c/path%3e%3cpath d='M0 1080L677.3075675457528 1080L 0 402.6924324542472z' fill='url(%26quot%3b%23SvgjsLinearGradient2661%26quot%3b)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask2658'%3e%3crect width='1920' height='1080' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='50%25' y1='100%25' x2='50%25' y2='0%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient2659'%3e%3cstop stop-color='rgba(0%2c 125%2c 255%2c 1)' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(0%2c 111%2c 255%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient x1='0%25' y1='100%25' x2='100%25' y2='0%25' id='SvgjsLinearGradient2660'%3e%3cstop stop-color='rgba(15%2c 70%2c 185%2c 0.2)' offset='0'%3e%3c/stop%3e%3cstop stop-opacity='0' stop-color='rgba(15%2c 70%2c 185%2c 0.2)' offset='0.66'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient x1='100%25' y1='100%25' x2='0%25' y2='0%25' id='SvgjsLinearGradient2661'%3e%3cstop stop-color='rgba(15%2c 70%2c 185%2c 0.2)' offset='0'%3e%3c/stop%3e%3cstop stop-opacity='0' stop-color='rgba(15%2c 70%2c 185%2c 0.2)' offset='0.66'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        background-attachment: fixed; /* Optional: To fix the background image during scroll */
    }
</style>
