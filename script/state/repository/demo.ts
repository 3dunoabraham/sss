
export async function fetchDB(supabase:any, id:any) {
    const { data: existingObject, error: selectError } = await supabase
        .from('demo')
        .select('*')
        .match({ id })
        .single()
    return existingObject
}
export async function fetchDemoList(supabase:any,) {
    const { data: existingObjectList, error: selectError } = await supabase
        .from('demo')
        .select('*')
    return existingObjectList
}