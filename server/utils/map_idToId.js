const map_idToId = (objectToMap) => {
    const {_id, ...rest} = objectToMap;
    return {id: _id, ...rest}
}

module.exports =  map_idToId;