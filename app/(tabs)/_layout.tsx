import { Tabs } from 'expo-router'
import { Home, Search, PlusCircle, Trophy, User } from 'lucide-react-native'
import { COLORS, SPACING } from '../../constants'

export default function TabsLayout() {
  return (
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
        name="challenges"
        options={{
          title: 'Challenges',
          tabBarIcon: ({ color, size }) => <Trophy color={color} size={size} />,
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
  )
}
