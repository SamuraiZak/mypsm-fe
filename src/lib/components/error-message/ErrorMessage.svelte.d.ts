import type { SvelteComponentTyped } from 'svelte';

declare const __propDef: {
    props: {
        condition: boolean | undefined;
        message: string | undefined;
    };
};

export type ErrorMessageProps = typeof __propDef.props;

export default class ErrorMessage extends SvelteComponentTyped<ErrorMessageProps> {}
export {};
