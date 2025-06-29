export const targets = ['StackBlitz', 'Bolt.new', 'GitHub'] as const

export type TargetSite = (typeof targets)[number]
