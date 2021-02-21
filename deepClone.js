function deepClone(obj) {
    let result = Array.isArray(obj)? {} : []
    for (let key in obj) {
        if(obj.hasOwnProperty(key)){
            if(typeof obj[key] === 'object' && obj[key]!==null) {
                result[key] = deepClone(obj[key])
            } else {
                result[key] = obj[key]
            }
        }
    }
    return result
}