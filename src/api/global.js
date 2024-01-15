import apiHandler from './base'

export async function getLocations(url) {
  const { data } = await apiHandler().get(url)
  return data
}

export async function getLocationSummary(url) {
  const { data } = await apiHandler().get(url)
  return data
}

export async function getAllLandRecords(url = '', queryParams = '') {
  const { data } = await apiHandler().get(url)

  return data
}

export async function getSingleLandRecord(url) {
  const { data } = await apiHandler().get(url)

  return data
}

export async function sellProperty(url, requestData) {
  const { data } = await apiHandler().post(url, requestData)
  return data
}
export async function transferProperty(url, requestData) {
  const { data } = await apiHandler().post(url, requestData)
  return data
}

export async function createProperty(url, requestData) {
  const { data } = await apiHandler().post(url, requestData)
  return data
}
