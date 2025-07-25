import { Stack } from 'expo-router'
import { AuthRedirect } from '../../components/auth/AuthRedirect'

export default function AuthLayout() {
  return (
    <AuthRedirect>
      <Stack>
      <Stack.Screen 
        name="welcome" 
        options={{ 
          headerShown: false,
          gestureEnabled: false,
        }} 
      />
      <Stack.Screen 
        name="login" 
        options={{ 
          headerShown: false,
          presentation: 'modal',
        }} 
      />
      <Stack.Screen 
        name="register" 
        options={{ 
          headerShown: false,
          presentation: 'modal',
        }} 
      />
      <Stack.Screen 
        name="reset-password" 
        options={{ 
          headerShown: false,
          presentation: 'modal',
        }} 
      />
      <Stack.Screen 
        name="verify-email" 
        options={{ 
          headerShown: false,
          gestureEnabled: false,
        }} 
      />
      </Stack>
    </AuthRedirect>
  )
}