import type { _proceedingSentencingMeetingSchema, _sentenceSchema } from '$lib/schemas/mypsm/integrity/proceeding-scheme';
import type { z } from 'zod';

export type ProceedingSentencingMeetingRequestDTO = z.infer<
    typeof _proceedingSentencingMeetingSchema
>;

export type ProceedingSentenceRequestDTO = z.infer<
    typeof _sentenceSchema
>;
