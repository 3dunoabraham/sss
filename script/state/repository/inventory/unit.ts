import CONSTANTS from '@/../script/constant/json/api.json'
import { fetchJsonArray, fetchMultipleJsonArray, parseArray } from '@/../script/util/helper'
import { API_UNIT_OPTS_BASE } from '@/../script/constant'

const api_url = process.env.DATA_API_URL || CONSTANTS.DATA_API_URL

interface Unit {
  brand: string
  characteristics: {
    axles: string
    color: string
    gvwr: string
    hitch_type: string
    shipping_weight: string
  }
  condition: number
  current_investor: string
  dealer: string
  distributor: string
  gps: {
    manufacturer: string
    serial: string
  }
  id: number
  images: string
  inventory_status: number
  location: number | null
  location_related: number | null
  manufacturer: string
  model_style: string
  owner: string
  physical_as_of: Date | null
  previous_investor: string
  price: {
    agreement_price: string
    min_agreement_price: string
    min_retail_price: string
    retail_price: string
  }
  registration_title: {
    mso: string
    title_number: string
    title_state: string
    title_status: string
  }
  sales_date: Date | null
  sales_status: number
  size: {
    height: {
      feet: string
      inches: string
    }
    length: {
      feet: string
      inches: string
    }
    width: {
      feet: string
      inches: string
    }
  }
  sub_manufacturer: string
  type: number
  uid: string
  vin: string | null
  workorder: string | null
  year: number | null
}

export const fetchUnits = async (config: RequestInit = {}): Promise<Unit[]> => {
  try {
    const response = await fetch(`${api_url}/units/`, config)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    if (!Array.isArray(data?.Units)) {
      throw new Error(`Invalid response! data: ${JSON.stringify(data)}`)
    }
    return data.Units
  } catch (error: any) {
    console.error(error)
    return []
    throw new Error(`Failed to fetch units. Error: ${error.message}`)
  }
}

interface UnitStatuses {
  inventory_statuses: string[]
  sales_statuses: string[]
  title_statuses: string[]
  conditions: number[]
}

export async function fetchUnitStatuses(): Promise<UnitStatuses> {
  try {
      let model_styles = (
          await fetchJsonArray(API_UNIT_OPTS_BASE+"model_styles", "Model Styles")
      )
      let reqObj = {
          "inventoryStatuses": [API_UNIT_OPTS_BASE+"inventory_statuses",""],
          "saleStatuses": [API_UNIT_OPTS_BASE+"sales_statuses",""],
          "titleStatuses": [API_UNIT_OPTS_BASE+"title_statuses",""],
          "conditions": [API_UNIT_OPTS_BASE+"conditions",""],
      }
      let reqObjKeys = Object.keys(reqObj)
      let optsArray = await fetchMultipleJsonArray(reqObj)
      let inventory_statuses = parseArray(optsArray[reqObjKeys.indexOf("inventoryStatuses")])
      let sales_statuses = parseArray(optsArray[reqObjKeys.indexOf("saleStatuses")])
      let title_statuses = parseArray(optsArray[reqObjKeys.indexOf("titleStatuses")])
      let conditions = parseArray(optsArray[reqObjKeys.indexOf("conditions")])

      return {
          inventory_statuses, sales_statuses, title_statuses, conditions,
      }
  } catch (err) {
      return {
          inventory_statuses:[],
          sales_statuses:[],
          title_statuses:[],
          conditions:[],
      }
  }
}