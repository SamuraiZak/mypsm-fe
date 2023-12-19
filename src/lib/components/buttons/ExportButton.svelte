<script>
    import { Button } from 'flowbite-svelte';
    export let exportType = 'excel';
    export let onClick = () => {};
</script>

{#if exportType === 'excel'}
    <Button
        class="text- flex h-[32px] flex-row rounded-md border border-solid border-black px-1.5 hover:border-system-primary hover:text-system-primary"
        on:click={onClick}
        ><svg
            class="h-5 w-5"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 24 24"
            xml:space="preserve"
            fill="#000000"
            ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></g><g id="SVGRepo_iconCarrier">
                <g>
                    <path
                        style="fill:currentColor;"
                        d="M25.162,3H16v2.984h3.031v2.031H16V10h3v2h-3v2h3v2h-3v2h3v2h-3v3h9.162 C25.623,23,26,22.609,26,22.13V3.87C26,3.391,25.623,3,25.162,3z M24,20h-4v-2h4V20z M24,16h-4v-2h4V16z M24,12h-4v-2h4V12z M24,8 h-4V6h4V8z"
                    ></path>
                    <path
                        style="fill:currentColor;"
                        d="M0,2.889v20.223L15,26V0L0,2.889z M9.488,18.08l-1.745-3.299c-0.066-0.123-0.134-0.349-0.205-0.678 H7.511C7.478,14.258,7.4,14.494,7.277,14.81l-1.751,3.27H2.807l3.228-5.064L3.082,7.951h2.776l1.448,3.037 c0.113,0.24,0.214,0.525,0.304,0.854h0.028c0.057-0.198,0.163-0.492,0.318-0.883l1.61-3.009h2.542l-3.037,5.022l3.122,5.107 L9.488,18.08L9.488,18.08z"
                    ></path>
                </g>
            </g></svg
        >
    </Button>
{:else if exportType === 'pdf'}
    <Button
        class="text- flex h-[32px] flex-row rounded-md border border-solid border-black px-1.5 hover:border-system-primary hover:text-system-primary"
        on:click={onClick}
        ><svg
            fill="currentColor"
            class="h-5 w-5"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 91.201 91.201"
            xml:space="preserve"
            ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></g><g id="SVGRepo_iconCarrier">
                <g>
                    <g>
                        <path
                            d="M45.182,37.845c-1.118,0-1.842,0.099-2.269,0.197v14.502c0.427,0.099,1.118,0.099,1.743,0.099 c4.538,0.032,7.497-2.467,7.497-7.76C52.186,40.279,49.488,37.845,45.182,37.845z"
                        ></path>
                        <path
                            d="M25.817,37.78c-1.021,0-1.71,0.099-2.072,0.197v6.543c0.428,0.099,0.953,0.132,1.677,0.132 c2.664,0,4.308-1.348,4.308-3.617C29.73,38.996,28.317,37.78,25.817,37.78z"
                        ></path>
                        <path
                            d="M58.984,0H12.336v91.201h66.529V27.05L55.23,10.73L58.984,0z M32.656,46.165c-1.71,1.61-4.241,2.335-7.2,2.335 c-0.659,0-1.25-0.033-1.711-0.1v7.924H18.78V34.459c1.545-0.264,3.715-0.461,6.773-0.461c3.091,0,5.294,0.592,6.775,1.776 c1.414,1.118,2.367,2.959,2.367,5.129C34.695,43.074,33.971,44.915,32.656,46.165z M60.764,34.163h13.549v4.11h-8.517v5.063h7.958 v4.076h-7.958v8.912h-5.032V34.163z M57.479,44.717c0,4.242-1.543,7.168-3.682,8.977c-2.335,1.94-5.887,2.862-10.226,2.862 c-2.598,0-4.44-0.166-5.689-0.329V34.459c1.842-0.296,4.242-0.461,6.775-0.461c4.208,0,6.938,0.756,9.076,2.369 C56.033,38.076,57.479,40.805,57.479,44.717z"
                        ></path>
                        <polygon points="63.652,0 60.613,8.694 78.865,21.297 "
                        ></polygon>
                    </g>
                </g>
            </g></svg
        >
    </Button>
{:else if exportType === 'word'}
    <Button
        class="text- flex h-[32px] flex-row rounded-md border border-solid border-black px-1.5 hover:border-system-primary hover:text-system-primary"
        on:click={onClick}
        ><svg
            fill="currentColor"
            class="h-5 w-5"
            viewBox="0 0 14 14"
            role="img"
            focusable="false"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></g><g id="SVGRepo_iconCarrier"
                ><path
                    d="m 12.999992,2.866331 0,8.273839 c 0,0.0705 -0.025,0.127505 -0.0745,0.173007 -0.0505,0.047 -0.110505,0.069 -0.180008,0.069 l -4.2796751,0 0,-1.147547 3.4911431,0 0,-0.522522 -3.4941432,0 0,-0.639526 3.4911432,0 0,-0.522021 -3.4886431,0 0,-0.645027 3.4901431,0 0,-0.516021 -3.4901431,0 0,-0.646526 3.4901431,0 0,-0.522022 -3.4901431,0 0,-0.639526 3.4901431,0 0,-0.521521 -3.4901431,0 0,-0.652527 3.4901431,0 0,-0.497021 -3.4901431,0 0,-1.296553 4.2811751,0 c 0.0745,0 0.135006,0.024 0.179008,0.0745 0.0525,0.0495 0.075,0.110005 0.0745,0.178008 z m -5.1747123,-1.546064 0,11.361466 -6.82527977,-1.181048 0,-8.967368 6.82527977,-1.21505 0,0.002 z m -1.0300423,3.354138 -0.854535,0.0525 -0.5480225,3.392639 -0.012501,0 C 5.3531783,7.959039 5.2526742,7.397016 5.0726668,6.435977 L 4.7531537,4.80441 3.9511209,4.84441 3.6301077,6.435975 C 3.4426,7.363013 3.3380957,7.902535 3.3105946,8.054041 l -0.0075,0 -0.48752,-3.125128 -0.7350301,0.039 0.7875323,3.941661 0.8170335,0.0525 0.3075126,-1.534063 C 4.1726299,6.527981 4.2776342,6.004959 4.3001352,5.861953 l 0.022501,0 c 0.030501,0.152507 0.1280052,0.687029 0.3075126,1.605066 l 0.3075126,1.579065 0.8850363,0.0525 0.9900406,-4.425181 -0.017501,0 z"
                ></path></g
            ></svg
        >
    </Button>
{/if}
