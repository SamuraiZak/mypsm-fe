import type { ViewModeDTO } from "$lib/dto/core/view-mode/view-mode.dto";

export class ViewModeConstant {
    public static management: ViewModeDTO = {
        name: 'management',
        code: 'e49fc7f8-8a31-4d42-8ce5-c65c86f99bce'
    };
    public static employee: ViewModeDTO = {
        name: 'employee',
        code: 'ed3ba4d3-d8cd-43bf-8881-c7bdea5309d1'
    };
}