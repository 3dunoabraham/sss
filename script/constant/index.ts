import jsonSettings from '@/../script/constant/json/settings.json'
const localSettings:any = jsonSettings
export const LOCAL_URL = localSettings.api[0].value
export const OFFICIAL_URL = localSettings.api[1].value
export const API_URL = localSettings.api[2].value
export const API_URL_BASE = localSettings.api[3].value
export const API_ALT_URL = localSettings.api[4].value

export const API_BASE = API_URL+API_URL_BASE
export const STATIC_IMAGE_BASE = API_URL+"static/images/"
export const STATIC_DOC_BASE = API_URL+"static/docs/"

export const API_ROUTES = API_BASE+"routes/"

export const API_UNITS = API_BASE+"units/"
export const API_UNIT_BASE = API_BASE+"unit/"
export const API_UNIT_OPTS_BASE = API_UNITS+"opt/"

export const API_ORGS = API_BASE+"orgs/"
export const API_ORG_TYPES = API_BASE+"orgs/opt/types/"
export const API_PEOPLE_BASE = API_BASE+"people/"


export const API_IMAGE_UPLOAD_BASE = API_BASE+"image/upload/"
export const API_DOC_UPLOAD_BASE = API_BASE+"doc/upload/"

export const API_ADDRESSES = API_BASE+"addresses/"
export const API_IMAGES = API_BASE+"images/"
export const API_DOCS = API_BASE+"docs/"
export const API_NOTES = API_BASE+"notes/"

// Upload Error: \n 
export const API_INVALID_IMAGE_ALREADY_LOADING = "Please wait for the current image to be uploaded"
// File Size Error: \n 
export const API_INVALID_IMAGE_MAXSIZE = "Size of image is larger than the maximum!"
// Image Type/Extension Error: \n 
export const API_INVALID_IMAGE_FILETYPE = "Wrong Image Type or Extension!"
// File Type Error: \n 
export const API_INVALID_IMAGE_CORRUPT = "Corrupt image or file"
// Duplication Error: \n 
export const API_INVALID_IMAGE_DUPLICATE = "This image has already been assigned!"

// Document Type/Extension Error: \n 
export const API_INVALID_DOC_FILETYPE = "Wrong Document Type or Extension!"


export const GRANTS = {
  CANCRUD: {"crud": "create read update delete"},
  CANREAD: {"read": "read"},
  CANIMAGE: {"image": "create read update delete image"},
}

export const GRANTTREE:any = {
  "sp": {
    "root": {
      "unit": {
        ...GRANTS.CANCRUD,
      },
      "agreement": {
      },
    }
  },
  "ims": {
    "root": {
      "unit": {
        ...GRANTS.CANCRUD,
        ...GRANTS.CANIMAGE
      },
    }
  },
}

export interface IItemLabel {
  id: string;
  label: string;
}
export interface IItemName {
  id: string;
  name: string;
}
export const DEFAULT_ALERT_MAPARRAY:any = [["error",""],["warn",""],["wait",""],["success",""],["neutral",""]]


export const USERS_DB = {
  "user":{name: "John Doe", grants:{unit:{add:true,delete:false}}},
  "admin":{name: "ADMIN", grants:{unit:{add:false,delete:true}}},
}

// export const USERS_DB = {
//   "user":{name: "John Doe", grants:{unit:{add:true,delete:false}}},
//   "admin":{name: "ADMIN", grants:{unit:{add:false,delete:true}}},
// }

export const FAKE_UNIT_FOREIGNS = {
  sales_statuses: [
    {id:"1", label: "Available"},
    {id:"2", label: "Rented"},
    {id:"3", label: "Sold"},
    {id:"4", label: "Not Available"},
  ],
  customersArray: [],
  orgsArray: [],
  dealers: [],
}

export const INSTITUTION = {
  title: "ServicePad",
  email: "support@servicepad.com",
  titleSupport: "ServicePad Customer Support:",
  copyrights: "© 2022 ServicePad, Inc. All rights reserved.",
}