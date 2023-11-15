import { z } from 'zod'

export const createTranscriptionParamsValidation = z.object({
  video_id: z.string().uuid(),
})

export const createTranscriptionBodyValidation = z.object({
  prompt: z.string(),
})
