import { z } from 'zod'

export const UpdateTopicSchema = z.object({
  topicId: z.string().min(1, 'Topic ID is required'),
  completed: z.boolean(),
})

export const UpdateTopicRequestSchema = z.object({
  topicId: z.string().min(1, 'Topic ID is required'),
  completed: z.boolean(),
}).strict()

export type UpdateTopic = z.infer<typeof UpdateTopicSchema>
export type UpdateTopicRequest = z.infer<typeof UpdateTopicRequestSchema>
