import { writable } from 'svelte/store'

export const defaultModule = ""
export const defaultSubModule = ""
export const defaultDescription = ""
export const defaultModuleAction = ""

export const moduleName = writable(defaultModule)
export const subModuleName = writable(defaultSubModule)
export const moduleDescription = writable(defaultDescription)
export const moduleAction = writable(defaultModuleAction)