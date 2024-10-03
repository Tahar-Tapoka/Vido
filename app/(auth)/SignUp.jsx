import { View, Text, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import Logo from "../../components/Logo";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser, getCurrentUser } from "../../lib/appwrite";
import ThemeView from "../../components/ThemeView";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const { setUser, setIsLogged } = useGlobalContext();

  const submit = async () => {
    setSubmitting(true);

    if (form.username && form.email && form.password) {
      try {
        const result = await createUser(
          form.username,
          form.email,
          form.password
        );
        setUser(result);
        setIsLogged(true);
        router.replace("Home");
      } catch (error) {
        Alert.alert("Error", "An error occurred while creating the user.");
      }
    } else {
      Alert.alert("Failed", "Please enter your details");
    }
    setSubmitting(false);
  };

  return (
    <ThemeView>
      <ScrollView>
        <View className="min-h-[85vh] w-full px-4  justify-center">
          <Logo />
          <Text className="text-2xl font-psemibold text-white mt-10">
            Create a new account
          </Text>
          <FormField
            label="Username"
            value={form.username}
            handleTextChange={(e) => {
              setForm({ ...form, username: e });
            }}
          />

          <FormField
            label="Email"
            value={form.email}
            handleTextChange={(e) => {
              setForm({ ...form, email: e });
            }}
            keyBoardType="email-address"
          />
          <FormField
            label="Password"
            value={form.password}
            handleTextChange={(e) => {
              setForm({ ...form, password: e });
            }}
          />

          <CustomButton
            label="Sign Up"
            handlePress={submit}
            containerStyle="mt-7"
            textStyle="text-white"
            isLoading={submitting}
          />

          <View className="flex-row gap-2 justify-center mt-10 items-center">
            <Text className="text-lg font-pregular text-gray-100">
              Already have an account?
            </Text>
            <Link
              href="/SignIn"
              className="text-secondary font-psemibold text-lg"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </ThemeView>
  );
};

export default SignUp;
