import { registerForPushNotificationsAsync } from '@/lib/notifications'
import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { ExpoPushToken } from 'expo-notifications'
import * as Notifications from 'expo-notifications'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [expoPushToken, setExpoPushToken] = useState<String | undefined>()
  const [notification, setNotification] = useState<Notifications.Notification>()
  const notificationListener = useRef<Notifications.Subscription>()
  const responseListener = useRef<Notifications.Subscription>()

  useEffect(() => {
    // console.warn('Provider init')
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token))

    notificationListener.current =
      Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification)
      })

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response)
      })

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        )
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current)
      }
    }
  }, [])

  console.log('Push token:', expoPushToken)
  //   confirm.log(notification)
  console.log('Notif', notification)

  return <>{children}</>
}

export default NotificationProvider
