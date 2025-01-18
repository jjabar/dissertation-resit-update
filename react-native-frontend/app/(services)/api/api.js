import axios from "axios";
 import { loadUserFromStorage } from "../../(redux)/authSlice";

export const base_url = process.env.BACKEND_API; 

//login
export const loginUser = async ({email, password}) => {
    
    const response = await axios.post(`${base_url}/auth/login`, {email, password}); 
    //return promise
    return response.data
}


//register
export const registerUser = async ({username,email, password}) => {
    const response = await axios.post(`${base_url}/auth/register`, {username,email, password}); 
    //return promise
    return response.data
}

// fetch sensor location
export const fetchLocation = async () => {
    const {token}  =  await loadUserFromStorage()
    
    try {
        const response = await axios.get(
            `${base_url}/location/latest`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }   
            }

        );
        
   
        return response.data

    } catch (error) {
        console.log(error)
    }
}

// fetch sensor alerts
export const fetchAlerts = async () => {
    const {token}  =  await loadUserFromStorage()
    
    try {
        const response = await axios.get(
            `${base_url}/location/latest/alert`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }   
            }

        );
        
   
        return response.data

    } catch (error) {
        console.log(error)
    }
}

export const fetchSensors = async () => {
  const { token } = await loadUserFromStorage();

  try {
    const response = await axios.get(`${base_url}/animals/active/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
   
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//fetch daily summary
export const fetchDailySummary = async (sensor) => {
    const {token}  =  await loadUserFromStorage()
    try {
        const response = await axios.get(`${base_url}/stats/daily/${sensor}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
   
        return response.data

    } catch (error) {
        console.log(JSON.stringify(error))
    }
}

//fetch hourly summary
export const fetchHourlySummary = async (sensor) => {
    const {token}  =  await loadUserFromStorage()
    try {
        const response = await axios.get(`${base_url}/stats/hourly/${sensor}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
   
        return response.data

    } catch (error) {
        console.log(JSON.stringify(error))
    }
}

export const exportDailyData = async () => {
    const {token}  =  await loadUserFromStorage()
    try {
        const response = await axios.get(`${base_url}/export-data/today`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
   
        return response.data

    } catch (error) {
        console.log(JSON.stringify(error))
    }
}

export const getSensorForEdit = async (id) => {
    const {token}  =  await loadUserFromStorage()
    try {
        const response = await axios.get(`${base_url}/sensors/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        
        return response.data.sensor

    } catch (error) {
        console.log(JSON.stringify(error))
    }
}

export const getAnimalForEdit = async (id) => {
    const {token}  =  await loadUserFromStorage()
    try {
        const response = await axios.get(`${base_url}/animals/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
      
        return response.data.animal

    } catch (error) {
        console.log(JSON.stringify(error))
    }
}
