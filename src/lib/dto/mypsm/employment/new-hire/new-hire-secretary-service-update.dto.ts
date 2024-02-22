import type { _serviceInfoSchema } from "$lib/schemas/mypsm/employment/new-hire/schema";
import type { z } from "zod";

export type NewHireSecretaryServiceUpdateDTO = z.infer<typeof _serviceInfoSchema>;