import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";
import { CreatePostsScreen } from "../Screens/CreatePostsScreen";
import { RegistrationScreen } from "../Screens/RegistrationScreen";
import { LoginScreen } from "../Screens/LoginScreen";
import { ProfileScreen } from "../Screens/ProfileScreen";
import { Home } from "../Screens/Home";

import { TouchableOpacity, Image } from "react-native";

const MainStack = createStackNavigator();
export default function Page() {
  return (
    <NavigationContainer independent={true}>
      <MainStack.Navigator initialRouteName="Login">
        <MainStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            headerShown: false,
            // Обновленная часть
            // headerRight: () => (
            //   <TouchableOpacity
            //     style={styles.logoutBtn}
            //     onPress={() =>
            //       navigation.navigate("Login", { screen: "Login" })
            //     }
            //   >
            //     <Image
            //       source={require("../assets/images/logout.png")}
            //       style={{ width: 24, height: 24, marginRight: 10 }}
            //     ></Image>
            //   </TouchableOpacity>
            // ),
          })}
        />
        <MainStack.Screen
          name="Posts"
          component={Home}
          options={({ navigation }) => ({
            headerRight: () => (
              <SafeAreaView style={{ flex: 1 }}>
                <TouchableOpacity
                  style={styles.logoutBtn}
                  onPress={() =>
                    navigation.navigate("Login", { screen: "Login" })
                  }
                >
                  <Image
                    source={require("../assets/images/logout.png")}
                    style={{ width: 24, height: 24, marginRight: 10 }}
                  ></Image>
                </TouchableOpacity>
              </SafeAreaView>
            ),
          })}
        />
        {/* <MainStack.Screen
          name="CreatePostsScreen"
          component={CreatePostsScreen}
        /> */}
        {/* <MainStack.Screen name="ProfileScreen" component={ProfileScreen} /> */}
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
