import { View, Text, Image } from "react-native";
import { Tabs } from "expo-router";
import icons from "../../constants/icons";
import Colors from "../../constants/Colors";

const TabBarIcon = ({ name, color, focused, icon }) => (
  <View className="items-center gap-2">
    <Image
      source={icon}
      resizeMode="contain"
      tintColor={color}
      className="w-6 h-6"
    />
    <Text
      className={`${focused ? "font-psemibold" : "text-xs"}`}
      style={{ color }}
    >
      {name}
    </Text>
  </View>
);

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: Colors.secondary,
          tabBarInactiveTintColor: Colors.gray,
          tabBarStyle: {
            backgroundColor: Colors.background,
            borderTopWidth: 1,
            borderTopColor: Colors.gray,
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="Home"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name="Home"
                color={color}
                icon={icons.home}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name="Profile"
                color={color}
                icon={icons.profile}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Create"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name="Create"
                color={color}
                icon={icons.plus}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Bookmark"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name="Bookmark"
                color={color}
                icon={icons.bookmark}
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
