import React, { useEffect, useState } from "react";
import MapView, {Marker} from "react-native-maps";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { fetchAlerts, fetchLocation } from "../(services)/api/api";
import * as Notifications from "expo-notifications"
import { initializeNotification } from "../../component/Notification";

initializeNotification();
export default function Location() {
  

  const [mapData, setMapData] = useState([])
  
  const scheduleNotification = (seconds, data) => {
    Notifications.scheduleNotificationAsync({
      content:  {title: "Alert", body: `${data.animalTag} temperature ${data.temperature} or heartbeat ${data.heartbeat} is abnormal`},
      trigger: seconds === undefined ?  null : {seconds},
    });
  }
  const handleShowNotification = (data) => {
    data.forEach((animal) => {
      scheduleNotification(0,animal);
    })
    
  }

  useEffect(() => {
    const location = setInterval(async () => {
      const {latest} = await fetchLocation();
     
      setMapData([...latest])
      
    }, 5000)

    return () => clearTimeout(location);
  },[])  


  useEffect(() => {
    const location = setInterval(async () => {
      const { latest } = await fetchAlerts();

      
      handleShowNotification(latest);
    }, 60000);

    return () => clearTimeout(location);
  }, []);  
  
  
  return (
    <>
      {mapData.length === 0 ? (
        <View style={styles.textContainer}>
          <ActivityIndicator
            animating={true}
            size="large"
            style={{ opacity: 1 }}
            color="#8ac926"
          />
        </View>
      ) : (
        <View style={styles.container}>
          <MapView
            style={styles.map}
            region={{
              longitudeDelta: 0.6,
              latitudeDelta: 0.6,
              longitude: mapData?.[0]?.longitude ,
              latitude: mapData?.[0]?.latitude,
            }}
          >
            {mapData?.map((location) => (
              <Marker
                key={location?._id}
                coordinate={{
                  latitude: location?.latitude || "",
                  longitude: location?.longitude || "",
                }}
                title={location?.animalTag}
                image={require("../../assets/logo.png")}
              />
            ))}
          </MapView>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  text: {
    fontSize: 20,
    color: "#8ac926"
  },
  map: {
    width: "100%",
    height: "100%",
  },
 
});
