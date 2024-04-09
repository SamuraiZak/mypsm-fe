import type { _PTBPensionInfoSchema} from '$lib/schemas/mypsm/employment/PTB-KWAP/schema';
import type { z } from 'zod';

export type PTBPensionDTO = z.infer<typeof _PTBPensionInfoSchema>;