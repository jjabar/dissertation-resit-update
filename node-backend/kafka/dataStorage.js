import Location from "../models/location.model.js";

const dataStorage = async(data) => {
    
    data.forEach(async(item) => {
        await Location.create({
            sensorTag: item.sensorTag,
            userId: item.userId,
            animalTag: item.animalTag,
            slug: item.slug,
            longitude : item.longitude,
            latitude : item.latitude,
            temperature : item.temperature,
            heartbeat: item.heartbeat,
            timestamp : item.timestamp,
        })
    });
 
    return `${data.length} items stored successfully`; 
}

export default dataStorage;