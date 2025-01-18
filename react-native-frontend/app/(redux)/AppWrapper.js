
import { Stack } from 'expo-router'
import { loadUser } from './authSlice'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react';



const AppWrapper = () => {

    const dispatch = useDispatch();
    useEffect(() =>{
        dispatch(loadUser())
    },[loadUser])
    


  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: "Home" }}
      />

      <Stack.Screen
        name="(drawer)"
        options={{  title: "Drawer", headerShown: false, }}
      />
    </Stack>
  );
}

export default AppWrapper