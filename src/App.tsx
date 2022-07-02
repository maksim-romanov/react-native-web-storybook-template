import React from 'react';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Button,
  // SafeAreaView,
  // ScrollView,
  StatusBar,
  // StyleSheet,
  Text,
  // TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

function HomeScreen() {
  type HomeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

  const navigation = useNavigation<HomeScreenProp>();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>

      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function DetailsScreen() {
  type DetailsScreenProp = NativeStackNavigationProp<
    RootStackParamList,
    'Details'
  >;

  const navigation = useNavigation<DetailsScreenProp>();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>

      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details')}
      />

      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />

      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home title',
            // headerTitle: () => <Text>Test title</Text>,
          }}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
