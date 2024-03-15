import type { _dependencyEditRequestSchema, _dependencyListRequestSchema, _dependencyListResponseSchema, _familyListRequestSchema, _familyListResponseSchema, _nextOfKinEditRequestSchema, _nextOfKinListRequestSchema, _nextOfKinListResponseSchema, _relationsSchema } from '$lib/schemas/mypsm/profile/profile-schemas';
import type { z } from 'zod';

export type familyResponseDTO = z.infer<
    typeof _familyListResponseSchema
>;
export type dependencResponseDTO = z.infer<
    typeof _dependencyListResponseSchema
>;

export type nextOfKinResponseDTO = z.infer<
    typeof _nextOfKinListResponseSchema
>;


export type familyRequestDTO = z.infer<
    typeof _familyListRequestSchema
>;
export type dependencyRequestDTO = z.infer<
    typeof _dependencyListRequestSchema
>;
export type nextOfKinRequestDTO = z.infer<
    typeof _nextOfKinListRequestSchema
>;



export type dependencyEditRequestDTO = z.infer<
    typeof _dependencyEditRequestSchema
>;

export type nextOfKinEditRequestDTO = z.infer<
    typeof _nextOfKinEditRequestSchema
>;

export type Family = z.infer<typeof _relationsSchema>;
export type Dependency = z.infer<typeof _relationsSchema>;
export type NextOfKin = z.infer<typeof _relationsSchema>;
