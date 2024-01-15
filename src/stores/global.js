import { defineStore } from 'pinia'
import {
  getLocations,
  getLocationSummary,
  getAllLandRecords,
  getSingleLandRecord,
  sellProperty,
  transferProperty,
  createProperty
} from '../api/global'
import { ref } from 'vue'

export const useGlobalStore = defineStore('globalStore', () => {
  const isLoading = ref(false)
  const locationData = ref([])
  const sessionCode = ref('')

  const generateCode = () => {
    return [...Array(5)].map(() => ((Math.random() * 36) | 0).toString(36)).join('')
  }

  const initializeSessionCode = () => {
    console.log('we are her')
    let code = localStorage.getItem('sessionCode')
    if (!code) {
      code = generateCode()
      localStorage.setItem('sessionCode', code)
    }
    sessionCode.value = code
    console.log(sessionCode)
  }

  const getLocationData = async (state_code) => {
    const response = await getLocations(
      `https://geoserver.grid3.gov.ng/geoserver/GRIDMaster/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=GRIDMaster:u_fe_builtup_areas&outputFormat=application%2Fjson&CQL_FILTER=state_code%3D%27${state_code}%27`
    )
    locationData.value = response

    return locationData.value
  }

  const regions = () => {
    return [
      {
        name: 'North',
        states: [
          {
            name: 'Abuja',
            code: 'FC'
          }
        ]
      },
      {
        name: 'South',
        states: [
          {
            name: 'Rivers',
            code: 'RI'
          }
        ]
      },
      {
        name: 'East',
        states: [
          {
            name: 'Anambra',
            code: 'AN'
          }
        ]
      },
      {
        name: 'South West',
        states: [
          {
            name: 'Lagos',
            code: 'LA'
          },
          {
            name: 'Oyo',
            code: 'OY'
          }
        ]
      }
    ]
  }

  const getRegionStates = (region) => {
    console.log(region)
    let regionStates = regions().find((item) => {
      return item.name.toLowerCase() == region.toLowerCase()
    })

    return regionStates.states
  }
  const states = () => {
    let states = regions()
      .map((region) => region.states)
      .flat()
    return states
  }

  const getMergedDataset = async () => {
    const statesList = states()
    let datasetfeatures = []

    for (const state of statesList) {
      let dataset = await getLocationData(state.code)
      datasetfeatures.push(dataset.features)
    }

    return datasetfeatures.flat()
  }
  const getLocationSummaryData = async (lat, lon) => {
    return await getLocationSummary(`/api/land/fetch?id=` + lon + '-' + lat)
  }

  const getAllLandRecordsData = (pageSize, filter, bookmark = '') => {
    const filterVal = JSON.stringify(filter)
    let url = `/api/lands?filter=${filterVal}&pageSize=${pageSize}`
    url = bookmark ? url + `&bookmark=${bookmark}` : url

    return getAllLandRecords(url)
  }

  const getSingleLandRecordData = (id) => {
    const url = `/api/land/fetch?id=${id}`

    return getSingleLandRecord(url)
  }

  const sellLand = async (data) => {
    const url = `/api/land/sell`
    const args = {
      args: [data.landId, data.buyerName, data.price]
    }
    return await sellProperty(url, args)
  }

  const transferLand = async (data) => {
    const url = '/api/land/transfer'
    const args = {
      args: [data.landId, data.receiverName]
    }

    return await transferProperty(url, args)
  }

  const createLand = async (data) => {
    const url = '/api/land/create'
    const args = {
      args: [
        data.landId,
        data.latitude,
        data.longitude,
        data.owner,
        data.address,
        data.price,
        data.tenureType,
        data.easement,
        data.covenants,
        data.mortgageDetails,
        data.description
      ]
    }
    return await createProperty(url, args)
  }

  return {
    isLoading,
    getLocationData,
    locationData,
    getLocationSummaryData,
    getAllLandRecordsData,
    getSingleLandRecordData,
    sellLand,
    transferLand,
    createLand,
    initializeSessionCode,
    regions,
    states,
    getMergedDataset,
    getRegionStates
  }
})
