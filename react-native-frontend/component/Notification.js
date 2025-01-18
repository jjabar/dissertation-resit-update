import * as Notifications from "expo-notifications"

export const initializeNotification = async () => {
    console.log("initialized")
    await Notifications.requestPermissionsAsync();
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
        })
    });
}