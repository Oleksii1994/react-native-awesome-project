import { StatusBar } from "expo-status-bar";

import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Alert,
  SafeAreaView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { useFonts } from "expo-font";
import { styles } from "../styles/registration.styles";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

export const RegistrationScreen = () => {
  const navigation = useNavigation();
  const [state, setState] = useState(initialState);
  const [isShowPassword, setIsShowPassword] = useState(false);
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [fontsLoaded] = useFonts({
    RobotoMedium: require("../assets/fonts/robotomedium.ttf"),
    RobotoRegular: require("../assets/fonts/robotoregular.ttf"),
  });

  const onRegister = () => {
    if (!state.email || !state.password || !state.userName) {
      Alert.alert("All fields must be filled");
      return;
    }
    if (!state.email.includes("@")) {
      Alert.alert("Enter a valid email address (Example: xxxx@yyyy.zzz)");
      return;
    }
    if (state.password.length < 8) {
      Alert.alert("Your password must have at least 8 characters");
      return;
    }
    console.log(state);
    setState(initialState);
    navigation.navigate("Home", {
      userName: state.userName,
      email: state.email,
    });
  };

  const handlePasswordVisibility = () => {
    setIsShowPassword(!isShowPassword);
  };

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        translucent="true"
        backgroundColor="rgba(0, 0, 0, 0)"
        style="dark"
        hidden="true"
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <ImageBackground
            source={require("../assets/images/photobg.jpg")}
            imageStyle={styles.image}
          ></ImageBackground>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
          >
            <View style={styles.containerForm}>
              <View style={styles.registrationFormBox}>
                <View style={styles.photoBox}>
                  <Image
                    source={require("../assets/images/add.png")}
                    style={styles.addPhotoImg}
                  ></Image>
                </View>
                <Text style={styles.registerTitle}>Registration</Text>
                <View style={styles.inputsContainer}>
                  <TextInput
                    style={styles.input}
                    value={state.userName}
                    onChangeText={(text) =>
                      setState({ ...state, userName: text.trim() })
                    }
                    placeholder="Login"
                  ></TextInput>
                  <TextInput
                    style={styles.input}
                    value={state.email}
                    keyboardType="email-address"
                    onChangeText={(text) =>
                      setState({ ...state, email: text.trim() })
                    }
                    placeholder="Email"
                  ></TextInput>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={styles.inputLast}
                      secureTextEntry={!isShowPassword}
                      minLength={8}
                      maxLength={16}
                      onChangeText={(text) =>
                        setState({ ...state, password: text.trim() })
                      }
                      value={state.password}
                      placeholder="Password (at least 8 characters)"
                    ></TextInput>
                    <TouchableOpacity
                      style={styles.showPasswordContainer}
                      onPress={handlePasswordVisibility}
                    >
                      <Text style={styles.showPasswordText}>
                        {!isShowPassword ? "Show" : "Hide"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  title="Sign up"
                  onPress={onRegister}
                  style={styles.signUpBtn}
                >
                  <Text style={styles.btnLabel}>Sign Up</Text>
                </TouchableOpacity>
                <View>
                  <TouchableOpacity
                    style={styles.textLogInContainer}
                    onPress={() =>
                      navigation.navigate("Login", {
                        name: state.userName,
                        email: state.email,
                      })
                    }
                  >
                    <Text style={styles.textLogIn}>
                      Already have account? Log In
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
