import { z } from 'zod'

export const TopicSchema = z.object({
  id: z.string(),
  title: z.string(),
  completed: z.boolean(),
})

export const ModuleSchema = z.object({
  slug: z.string(),
  title: z.string(),
  topics: z.array(TopicSchema),
})

export const ActivitySchema = z.object({
  lastActivityAt: z.nullable(z.string()),
  currentStreak: z.number(),
})

export const StateResponseSchema = z.object({
  modulesProgress: z.record(z.string(), z.any()),
  projectRequirementChecks: z.record(z.string(), z.any()),
  projectSubmissions: z.record(z.string(), z.any()),
  moduleSubmissions: z.record(z.string(), z.any()),
  activity: ActivitySchema,
})

export type Topic = z.infer<typeof TopicSchema>
export type Module = z.infer<typeof ModuleSchema>
export type Activity = z.infer<typeof ActivitySchema>
export type StateResponse = z.infer<typeof StateResponseSchema>
