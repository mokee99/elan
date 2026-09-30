const SANITY_PROJECT_ID = '3egwdftx'
const SANITY_DATASET = 'production'
const SANITY_API_VERSION = '2026-09-28'

const SANITY_API_URL =
  `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`

export async function sanityFetch(query, params = {}) {
  const searchParams = new URLSearchParams({
    query,
    ...params,
  })

  const response = await fetch(`${SANITY_API_URL}?${searchParams}`)

  if (!response.ok) {
    throw new Error(`Sanity request failed: ${response.status}`)
  }

  const data = await response.json()

  return data.result
}