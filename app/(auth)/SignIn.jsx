import { View, Text, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import Logo from "../../components/Logo";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { getCurrentUser, signIn } from "../../lib/appwrite";
import ThemeView from "../../components/ThemeView";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const { setUser, setIsLogged } = useGlobalContext();

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);
      router.replace("Home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <ThemeView>
      <ScrollView>
        <View className="min-h-[85vh] w-full px-4  justify-center">
          <Logo />
          <Text className="text-2xl font-psemibold text-white mt-10">
            Log in to your account
          </Text>
          <FormField
            label="Email"
            value={form.email}
            handleTextChange={(e) => {
              setForm({ ...form, email: e });
            }}
            keyBoardType="email-address"
            otherStyles="mt-7"
          />
          <FormField
            label="Password"
            value={form.password}
            handleTextChange={(e) => {
              setForm({ ...form, password: e });
            }}
            keyBoardType="default"
            otherStyles="mt-7"
          />
          <CustomButton
            label="Sign In"
            handlePress={submit}
            containerStyle="mt-7"
            textStyle="text-white"
            isLoading={submitting}
          />
          <View className="flex-row gap-2 justify-center mt-10 items-center">
            <Text className="text-lg font-pregular text-gray-100">
              Dont have an account?
            </Text>
            <Link
              href="/SignUp"
              className="text-secondary font-psemibold text-lg"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </ThemeView>
  );
};

export default SignIn;
