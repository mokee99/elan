import {sanityFetch} from './sanity-client.js'

async function testSanityConnection() {
  const query = `*[_type == "property" && slug.current == "villa-sereno"][0]{
    title,
    location,
    indoorArea,
    floors,
    bedrooms,
    bathrooms,
    viewType
  }`

  try {
    const property = await sanityFetch(query)

    console.log('Property from Sanity:', property)
  } catch (error) {
    console.error('Sanity error:', error)
  }
}

testSanityConnection()