import { API_ORGS, API_ORG_TYPES, API_PEOPLE_BASE, API_UNIT_BASE, API_UNIT_OPTS_BASE } from '../../../constant/index';
import { DEFAULT_UNIT_OPTS } from '@/../script/constant/unit';
import { dd } from '@/../script/util/helper/devHelper';
import { isStrInteger, jstr2FullName } from '@/../script/util/type/stringHelper';
import { fetchUnitStatuses } from '@/../script/state/repository/inventory/unit';
import { fetchJsonArray } from '../../../util/helper';


export const DEFAULT_UNIT_FOREIGNS:any = { sales_statuses: [], customersArray: [], orgsArray: [], dealers: [] }
export async function fetchUnitForeigns() {
    try {
        const customersResponse = await fetchJsonArray(API_PEOPLE_BASE+"customers", "Data")
        let customersArray = customersResponse.map((x:any)=>({...x,_name:`${x.full_name.first_name} ${x.full_name.last_name}`}))
        let orgsArray = await fetchJsonArray(API_ORGS, "Orgs")
        let { dealers } = await fetchAndParseOrgTypes(orgsArray)
            
        let sales_statuses = await fetchJsonArray(API_UNIT_OPTS_BASE+"sales_statuses")
        return { customersArray, orgsArray, sales_statuses, dealers, }
    } catch (err) {
        return DEFAULT_UNIT_FOREIGNS
    }
}
export async function fetchUnitPageData() {
    try {
        let model_styles = await fetchJsonArray(API_UNIT_OPTS_BASE+"model_styles", "Model Styles")
        let {inventory_statuses, sales_statuses, title_statuses, conditions} = await fetchUnitStatuses()
        let orgsList = await fetchJsonArray(API_ORGS,"Orgs")
        let {manufacturers, distributors, dealers, owners } = await fetchAndParseOrgTypes(orgsList)
        
        return {
            model_styles, inventory_statuses, sales_statuses, title_statuses, conditions,
            orgsList, distributors, manufacturers, dealers, owners,
        }
    } catch (err) {
        return DEFAULT_UNIT_OPTS
    }
}
export async function fetchUnitOptsObj() {
    try {
        let model_styles = await fetchJsonArray(API_UNIT_OPTS_BASE+"model_styles", "Model Styles")
        let {inventory_statuses, sales_statuses, title_statuses, conditions} = (
            await fetchUnitStatuses()
        )
        let orgsList = await fetchJsonArray(API_ORGS,"Orgs")
        let {manufacturers, distributors, dealers, owners } = (
            await fetchAndParseOrgTypes(orgsList)
        )

        return {
            model_styles,
            inventory_statuses, sales_statuses, title_statuses, conditions,
            orgsList, distributors, manufacturers, dealers, owners,
        }
    } catch (err) {
        return DEFAULT_UNIT_OPTS
    }
}


export const fetchShopifyProducts = async function () {
    const response = await fetch('https://dunowhy.myshopify.com/admin/api/2023-01/products.json', {
    headers: { 'X-Shopify-Access-Token': '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',
        'Content-Type': 'application/json'
    }});
    const products = await response.json();
    return { datas: { products: products.products, local: [] } };
}


export async function fetchAndParseOrgTypes(orgsArray:any) {
    let orgTypesList = await fetchJsonArray(API_ORG_TYPES)
    
    let manufacturers = parseOrgTypeList("manufacturer", orgsArray,orgTypesList)
    let distributors = parseOrgTypeList("distributor", orgsArray,orgTypesList);
    let dealers = parseOrgTypeList("dealer", orgsArray,orgTypesList)
    let owners = parseOrgTypeList("owner", orgsArray,orgTypesList)
    return {manufacturers, distributors, dealers, owners }
}
// export async function fetchUnitStatuses() {
//     try {
//       const reqObj = {
//         "inventoryStatuses": [API_UNIT_OPTS_BASE+"inventory_statuses",""],
//         "saleStatuses": [API_UNIT_OPTS_BASE+"sales_statuses",""],
//         "titleStatuses": [API_UNIT_OPTS_BASE+"title_statuses",""],
//         "conditions": [API_UNIT_OPTS_BASE+"conditions",""],
//       };
//       const reqObjKeys = Object.keys(reqObj);
  
//       const optsArray = await fetchMultipleJsonArray(reqObj);
  
//       return reqObjKeys.reduce((acc, key, idx) => {
//         acc[key] = parseArray(optsArray[idx]);
//         return acc;
//       }, {});
//     } catch (err) {
//       dd("fetchUnitStatuses", err);
//       return {
//         inventory_statuses:[],
//         sales_statuses:[],
//         title_statuses:[],
//         conditions:[],
//       };
//     }
// }

export function parseNoteObj(aNoteString:any,id:any) {
    let splittedString = aNoteString.split(" ")
    let [date,time,created_by,...rest] = splittedString
    return {
        created_at: date,
        created_by: created_by.split(":")[0],
        id: id,
        is_active: 'false',
        is_verified: 'false',
        text: rest.join(" "),
        units: '',
        updated_at: 'null',
        updated_by: 'null',
    }
}
export function parsedFetchedUnit(aUnit:any, orgsArray:any, customersArray:any) {
    let aParsedUnit = {...aUnit, ...{location: `-`}}
    if (aUnit.location_related == 0) return aParsedUnit 
    if (aUnit.location_related == 1)
    {
        let theFoundOrg = orgsArray.filter((aOrg:any, index:any)=>{
            return aOrg.id == aUnit.location
        })
        if (theFoundOrg.length == 0) return aParsedUnit
        aParsedUnit = {...aUnit, ...{location: theFoundOrg[0].name}}
    }
    if (aUnit.location_related == 2)
    {
        let theFoundCustomer = customersArray.filter((aOrg:any, index:any)=>{
            return aOrg.id == aUnit.location
        })
        if (theFoundCustomer.length == 0) return aParsedUnit
        aParsedUnit = {...aUnit, ...{location: theFoundCustomer[0]._name}}
    }
    return aParsedUnit 
}

export function parseChangedDataObj(changedData:any) {
    let the_data = Object.fromEntries(changedData) 
    if (changedData.has("year"))
    {
        if (!the_data.year) the_data.year = null
    }
    if (changedData.has("locations"))
    {
        Object.keys(the_data.locations).map((key,index)=>{
            if (key in the_data.locations && the_data.locations[key] == "None") return
            the_data[key] = the_data.locations[key] || null
        })
        delete the_data["locations"]
    }

    if (changedData.has("investors"))
    {
        Object.keys(the_data.investors).map((key,index)=>{
            if (
                    key in the_data.investors &&
                    (
                        the_data.investors[key] == "None" ||
                        (the_data.investors[key] != "" && !isStrInteger(`${the_data.investors[key]}`))
                    )
                ) return
            the_data[key] = the_data.investors[key] || null
        })
        delete the_data["investors"]
    }
    return the_data
}
export function parseChangedDataToAddObj(changedData:any) {
    let the_data = Object.fromEntries(changedData) 
    if (changedData.has("year"))
    {
        if (!the_data.year) the_data.year = null
    }
    if (changedData.has("locations"))
    {
        Object.keys(the_data.locations).map((key,index)=>{
            if (key in the_data.locations && the_data.locations[key] == "None") return
            the_data[key] = the_data.locations[key] || null
        })
        delete the_data["locations"]
    }

    if (changedData.has("investors"))
    {
        Object.keys(the_data.investors).map((key,index)=>{
            if (
                    key in the_data.investors &&
                    (
                        !the_data.investors[key] ||
                        the_data.investors[key] == "None" ||
                        (the_data.investors[key] != "" && !isStrInteger(`${the_data.investors[key]}`))
                    )
                ) {
                return
            }
            the_data[key] = the_data.investors[key]
        })
        delete the_data["investors"]
    }
    return the_data
}
export async function fetchUnitUIDAvailability(uid:any) {
    let theRequest = await fetch(API_UNIT_BASE + uid)
    let headerCType:any = theRequest.headers.get("content-type");
    let isUIDTaken = headerCType.includes("application/json")
    return !isUIDTaken
}
export async function fetchParsedUnit(uid:any) {
    let theRequest = await fetch(API_UNIT_BASE + uid);
    let headerCType = theRequest.headers.get("content-type");
    if (!headerCType || (headerCType && !headerCType.includes("application/json"))) return null
    let theUnitResult = await theRequest.json()
    if (!theUnitResult) return null
    let theParsedResult = theUnitResult.Data[0]
    let theExportResult = {...theParsedResult, ...{
        investors: {
            current_investor: jstr2FullName(theParsedResult.current_investor),
            previous_investor: jstr2FullName(theParsedResult.previous_investor),
        },
        locations: {
            location: theParsedResult.location,
            physical_as_of: theParsedResult.physical_as_of,
            location_related: theParsedResult.location_related,
        },
    }}
    return theExportResult
}
export function parseOrgTypeList(type:any, _orgsList:any, DEFAULT_ORG_TYPE_LIST:any) {
    if (type == "owner")
    {
        return _orgsList.filter((item:any,index:any)=> {return parseInt(item.type) <= 6 })
    }
    let orgTypeId  = DEFAULT_ORG_TYPE_LIST.filter((orgOptType:any)=>orgOptType.label == type)
    if (!orgTypeId.length) return []
    let returnList = _orgsList.filter((item:any,index:any)=> {
        return item.type == orgTypeId[0].id
    })
    return returnList
}










