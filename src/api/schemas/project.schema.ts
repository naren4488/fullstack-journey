import { z } from 'zod'

export const ProjectSubmissionSchema = z.object({
  githubUrl: z.string().url('githubUrl must be a valid URL'),
  liveUrl: z.string().url('liveUrl must be a valid URL'),
}).strict()

export type ProjectSubmission = z.infer<typeof ProjectSubmissionSchema>
