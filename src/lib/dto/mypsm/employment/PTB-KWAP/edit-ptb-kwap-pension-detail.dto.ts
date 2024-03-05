import type { _supporterInfoSchema} from '$lib/schemas/mypsm/employment/PTB-KWAP/schema';
import type { z } from 'zod';

export type ptbPensionDetailEditDTO = z.infer<typeof _supporterInfoSchema>;