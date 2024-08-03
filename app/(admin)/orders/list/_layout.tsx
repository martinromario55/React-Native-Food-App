import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { withLayoutContext } from 'expo-router'
import { SafeAreaView, SafeAreaViewComponent } from 'react-native'

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator)

export default function OrderListNavigator() {
  return (
    <SafeAreaView
      style={{ flex: 1, paddingVertical: 40, backgroundColor: 'white' }}
    >
      <TopTabs>
        <TopTabs.Screen name="index" options={{ title: 'Active' }} />
        <TopTabs.Screen name="archive" options={{ title: 'Archive' }} />
      </TopTabs>
    </SafeAreaView>
  )
}
