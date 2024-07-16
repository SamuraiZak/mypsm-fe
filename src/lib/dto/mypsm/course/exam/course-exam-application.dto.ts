import type {
    _addExamApplicationRequestSchema,
    _examApplicationDetailResponseSchema,
    _examApplicationInfoResponseSchema,
    _examApplicationListResponseSchema,
    _examSetAttendanceRequestSchema,
    _examSetAttendanceResponseSchema,
} from '$lib/schemas/mypsm/course/exam-schema';
import type { z } from 'zod';

export type CourseExamApplicationInfoResponseDTO = z.infer<
    typeof _examApplicationInfoResponseSchema
>;

export type CourseExamApplicationListResponseDTO = z.infer<
    typeof _examApplicationListResponseSchema
>;

export type CourseExamApplicationDetailResponseDTO = z.infer<
    typeof _examApplicationDetailResponseSchema
>;

export type CourseAddExamApplicationRequestDTO = z.infer<
    typeof _addExamApplicationRequestSchema
>;

export type CourseSetExamAttendanceResponseDTO = z.infer<
    typeof _examSetAttendanceResponseSchema
>;

export type CourseSetExamAttendanceRequestDTO = z.infer<
    typeof _examSetAttendanceRequestSchema
>;
