import type {
    _createFundApplicationRequestSchema,
    _fundApplicationDetailResponseSchema,
    _fundApplicationListResponseSchema,
} from '$lib/schemas/mypsm/course/fund-application-schema';
import type { z } from 'zod';

export type CourseFundApplicationListResponseDTO = z.infer<
    typeof _fundApplicationListResponseSchema
>;

export type CourseFundApplicationDetailResponseDTO = z.infer<
    typeof _fundApplicationDetailResponseSchema
>;

export type CourseAddFundApplicationRequestDTO = z.infer<
    typeof _createFundApplicationRequestSchema
>;
