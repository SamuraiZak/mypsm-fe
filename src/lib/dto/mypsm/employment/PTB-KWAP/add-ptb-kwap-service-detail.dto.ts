import type { _PTBInfoSchema} from '$lib/schemas/mypsm/employment/PTB-KWAP/schema';
import type { z } from 'zod';

export type ptbPensionRequestDTO = z.infer<typeof _PTBInfoSchema>;