import type { _fundApplicationPersonalInfoResponseSchema } from '$lib/schemas/mypsm/course/fund-application-schema';
import type { z } from 'zod';

export type CourseFundApplicationPersonalDetailResponseDTO = z.infer<
    typeof _fundApplicationPersonalInfoResponseSchema
>;
