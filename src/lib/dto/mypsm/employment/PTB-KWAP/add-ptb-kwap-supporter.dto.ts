import type { _addSupporterInfoSchema} from '$lib/schemas/mypsm/employment/PTB-KWAP/schema';
import type { z } from 'zod';

export type ptbAddSupportDTO = z.infer<typeof _addSupporterInfoSchema>;