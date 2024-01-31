export function clickToCopy(node: HTMLButtonElement, target: any) {
    async function copyText() {
        const text = target
            ? document.getElementById(target)?.innerHTML
            : node.innerText;

        try {
            await navigator.clipboard.writeText(text!);

            node.dispatchEvent(
                new CustomEvent('copysuccess', {
                    bubbles: true,
                }),
            );
        } catch (error) {
            node.dispatchEvent(
                new CustomEvent('copyerror', {
                    bubbles: true,
                    detail: error,
                }),
            );
        }
    }

    node.addEventListener('click', copyText);

    return {
        destroy() {
            node.removeEventListener('click', copyText);
        },
    };
}
