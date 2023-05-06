import CONSTANTS from '@/../script/constant/json/api.json'

const api_url = process.env.ALT_DATA_API_URL || CONSTANTS.ALT_DATA_API_URL

export const fetchAgreements = async ( config:any = {} ): Promise<any> => {
  try {
    const response:any = await fetch(`${api_url}/contracts`, config);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const agreementsRes = (await response.json()).data.list
    return agreementsRes
  } catch (error:any) {
    throw new Error(`Failed to fetch agreements w/ ${config}`);
  }
}
