import React from 'react'
import {Image, Pressable, Text, View, StyleSheet} from "react-native";
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { logoutAction } from '../app/(redux)/authSlice';

function MyCustomDrawer(props) {
  const {bottom} = useSafeAreaInsets();
  const navigation = useNavigation();

   const dispatch = useDispatch();
   const { user } = useSelector((state) => state?.auth);

   const handleLogout = () => {
     dispatch(logoutAction());
   };


/*   const closeDrawer = () => {
    navigation.dispatch(DrawerActions.closeDrawer())
  } */

  return (
    <View style={{ flex: 1 }}>
      {/** Main content */}
      <DrawerContentScrollView {...props} style={{ paddingTop: 5 }}>
        {/** Header */}
        <View>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={require("../assets/logo.png")}
          />
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <Pressable
        onPress={handleLogout}
        style={{ padding: 20, paddingBottom: bottom + 10 }}
      >
        <Text>Logout</Text>
      </Pressable>
      {/** Footer */}
    </View>
  );
}

export default MyCustomDrawer
const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: "#8ac926",
    borderWidth: 5,
    resizeMode: "cover",
    marginBottom: 20,
    marginInline: "auto",
  },
});
