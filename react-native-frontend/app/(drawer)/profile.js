import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../(redux)/authSlice';

const Profile = () => {
  const dispatch = useDispatch()
   const {user} = useSelector((state) => state?.auth);
   

   const handleLogout = () => {
    dispatch(logoutAction());
   }

   
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      {user?.user ? (
        <>
          <Text style={styles.text}>Username: {user?.user?.username}</Text>
          <Text style={styles.text}>Email: {user?.user?.email}</Text>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.text}>No user logged in</Text>
      )}
    </View>
  );
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
  },
  text: {
    fontSize: 18,
    marginBottom: 16,
    textTransform: "capitalize",
  },
  button: {
    height: 50,
    backgroundColor: "#8ac926",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 20,
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});