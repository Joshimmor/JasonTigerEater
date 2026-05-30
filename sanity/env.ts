export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-05-29'

export const dataset = 'production'

export const projectId = "qcokrzt4"

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
