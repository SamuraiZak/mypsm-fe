import type { _personalInfoSchema } from '$lib/schemas/mypsm/employment/new-hire/schema';
import type { z } from 'zod';

export type CandidatePersonalResponseDTO = z.infer<typeof _personalInfoSchema>;

export type CandidatePersonalRequestDTO = Omit<
    CandidatePersonalResponseDTO,
    'id' | 'isReadOnly'
>;
