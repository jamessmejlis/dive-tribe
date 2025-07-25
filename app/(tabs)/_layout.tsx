import { Tabs } from 'expo-router'
import { Home, Search, PlusCircle, Users, User } from 'lucide-react-native'
import { COLORS, SPACING } from '../../constants'
import { ProtectedRoute } from '../../components/auth/ProtectedRoute'

export default function TabsLayout() {
  return (
    <ProtectedRoute>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: COLORS.DIVE_BLUE,
          tabBarInactiveTintColor: COLORS.INACTIVE_TAB,
          tabBarStyle: {
            height: SPACING.TAB_BAR_HEIGHT,
            paddingBottom: SPACING.TAB_BAR_PADDING_BOTTOM,
            paddingTop: SPACING.TAB_BAR_PADDING_TOP,
          },
        }}
      >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: 'Discover',
          tabBarIcon: ({ color, size }) => <Search color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="log-dive"
        options={{
          title: 'Log Dive',
          tabBarIcon: ({ color, size }) => (
            <PlusCircle color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: 'Groups',
          tabBarIcon: ({ color, size }) => <Users color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
      </Tabs>
    </ProtectedRoute>
  )
}
