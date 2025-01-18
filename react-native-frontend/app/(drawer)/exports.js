import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Platform, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { base_url } from "../(services)/api/api";
import * as FileSystem from "expo-file-system";
import {shareAsync} from "expo-sharing"
import { loadUserFromStorage } from "../(redux)/authSlice";

const Exports = () => {
  const [loading, setLoading] = useState(false);

  const exportDaily = async () => {
    setLoading(true);

    const { token } = await loadUserFromStorage();
   
    const time = new Date().toLocaleTimeString().replaceAll(" ", "_");
    const date = new Date().toDateString().replaceAll(" ", "_")
    const filename = `daily_${date}_${time}.csv`;
    
    const result = await FileSystem.downloadAsync(`${base_url}/export-data/today`, FileSystem.documentDirectory + filename, {
       headers: {
            Authorization: `Bearer ${token}`,
          },
    })

    
    save(result.uri, filename, result.headers["Content-Type"]);

    setLoading(false);

  }

  const exportMonthly = async () => {
    setLoading(true);
    const { token } = await loadUserFromStorage();
   
    const time = new Date().toLocaleTimeString().replaceAll(" ", "_");
    const date = new Date().toDateString().replaceAll(" ", "_")
    const filename = `monthly_${date}_${time}.csv`;
    
    const result = await FileSystem.downloadAsync(`${base_url}/export-data/monthly`, FileSystem.documentDirectory + filename, {
       headers: {
            Authorization: `Bearer ${token}`,
          },
    })

    
    save(result.uri, filename, result.headers["Content-Type"]);

    setLoading(false);
  }
  const exportYearly = async () => {
    setLoading(true);
    const { token } = await loadUserFromStorage();
   
    const time = new Date().toLocaleTimeString().replaceAll(" ", "_");
    const date = new Date().toDateString().replaceAll(" ", "_")
    const filename = `yearly_${date}_${time}.csv`;
    
    const result = await FileSystem.downloadAsync(`${base_url}/export-data/yearly`, FileSystem.documentDirectory + filename, {
       headers: {
            Authorization: `Bearer ${token}`,
          },
    })

    
    save(result.uri, filename, result.headers["Content-Type"]);

    setLoading(false);
  }

  const exportAllTime = async () => {
    setLoading(true);
    const { token } = await loadUserFromStorage();
   
    const time = new Date().toLocaleTimeString().replaceAll(" ", "_");
    const date = new Date().toDateString().replaceAll(" ", "_")
    const filename = `all_time_${date}_${time}.csv`;
    
    const result = await FileSystem.downloadAsync(`${base_url}/export-data/all-time`, FileSystem.documentDirectory + filename, {
       headers: {
            Authorization: `Bearer ${token}`,
          },
    })

    
    save(result.uri, filename, result.headers["Content-Type"]);

    setLoading(false);
  }

  const save =  async (uri, filename, mimetype) => {
    if(Platform.OS === "android") {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync;
      if(permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, {encoding: FileSystem.EncodingType.Base64});
        await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, mimetype)
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, base64, {encoding: FileSystem.EncodingType.Base64})
          }).catch(error => console.log(error))
      }else {
        shareAsync(uri)
      }
    }else{
      shareAsync(uri);
    }
    
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          animating={true}
          size="large"
          style={{ opacity: 1 }}
          color="#8ac926"
        />
      ) : (
        <>
          <Text style={styles.header}>Export Data</Text>
          <View style={styles.section}>
            <TouchableOpacity style={styles.option} onPress={exportDaily}>
              <Icon name="clock-o" size={24} color="#4caf50" />
              <Text style={styles.optionText}>Export Today's Data</Text>
              <Icon
                name="angle-right"
                size={24}
                color="#999"
                style={styles.optionIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={exportMonthly}>
              <Icon name="calendar" size={24} color="#ff9800" />
              <Text style={styles.optionText}>Export Monthly</Text>
              <Icon
                name="angle-right"
                size={24}
                color="#999"
                style={styles.optionIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={exportYearly}>
              <Icon name="send-o" size={24} color="#f44336" />
              <Text style={styles.optionText}>Export Yearly</Text>
              <Icon
                name="angle-right"
                size={24}
                color="#999"
                style={styles.optionIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={exportAllTime}>
              <Icon name="file-archive-o" size={24} color="#3f51b5" />
              <Text style={styles.optionText}>Export All Time</Text>
              <Icon
                name="angle-right"
                size={24}
                color="#999"
                style={styles.optionIcon}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default Exports;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  section: {
    marginVertical: 10,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    elevation: 2,
  },
  optionText: {
    flex: 1,
    fontSize: 18,
    marginLeft: 10,
    color: "#333",
  },
  optionIcon: {
    marginLeft: "auto",
  },
});
