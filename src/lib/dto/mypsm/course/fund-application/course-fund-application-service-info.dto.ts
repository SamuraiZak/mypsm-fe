import type { _fundApplicationServiceInfoResponseSchema } from '$lib/schemas/mypsm/course/fund-application-schema';
import type { z } from 'zod';

export type CourseFundApplicationServiceDetailResponseDTO = z.infer<
    typeof _fundApplicationServiceInfoResponseSchema
>;
