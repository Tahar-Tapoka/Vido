import { View, Text, Image, ScrollView, Alert } from "react-native";
import FormField from "../../components/FormField";
import ThemeView from "../../components/ThemeView";
import CustomButton from "../../components/CustomButton";
import { TouchableOpacity } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import icons from "../../constants/icons";
import { useState } from "react";
import { useGlobalContext } from "../../context/GlobalProvider";
import { ResizeMode, Video } from "expo-av";
import { router } from "expo-router";
import { createVideoPost } from "../../lib/appwrite";

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
    userId: user.$id,
  });

  const openFilePicker = async (type) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: type === "image" ? "image/*" : ["video/mp4", "video/gif"], // ['image/png' ,'image/jpg'] : ['video/mp4', 'video/gif'] "video/*"
    });
    if (!result.canceled) {
      type === "image"
        ? setForm((prev) => ({ ...prev, thumbnail: result.assets[0] }))
        : setForm((prev) => ({ ...prev, video: result.assets[0] }));
    }
  };
  const handleSubmit = async () => {
    if (!form.title || !form.video || !form.thumbnail || !form.prompt) {
      Alert.alert("Error", "Please fill in all fields");
    }
    setUploading(true);
    try {
      await createVideoPost(form);

      Alert.alert("Success", "Video uploaded successfully");
      router.replace("Home");
    } catch (error) {
      console.log(error);
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
        userId: user.$id,
      });
      setUploading(false);
    }
  };
  return (
    <ThemeView>
      <ScrollView>
        <View className="px-4">
          <Text className="text-white text-2xl font-psemibold mt-10">
            Upload Video
          </Text>
          <FormField
            value={form.title}
            handleTextChange={(text) =>
              setForm((prev) => ({ ...prev, title: text }))
            }
            label="Video Title"
            placeholder="Add a title to your video"
          />
          <Text className="text-gray-100 text-base font-pmedium mt-5">
            Upload Video
          </Text>
          <TouchableOpacity
            onPress={() => openFilePicker("video")}
            className=" mt-2 border border-black-200 bg-black-100 rounded-2xl w-full h-40 justify-center items-center"
          >
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-40 rounded-2xl mt-2"
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className="h-14 w-14 border border-dashed border-x-secondary-100 items-center justify-center">
                <Image source={icons.upload} className="w-10 h-10" />
              </View>
            )}
          </TouchableOpacity>
          <Text className="text-gray-100 text-base font-pmedium mt-5">
            Upload Thumbnail
          </Text>
          <TouchableOpacity
            className=" mt-2 w-full"
            onPress={() => openFilePicker("image")}
          >
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                className="w-full h-64 rounded-2xl mt-2"
                resizeMode="contain"
              />
            ) : (
              <View className=" flex-row border border-black-200 bg-black-100 rounded-2xl h-16 justify-center items-center">
                <Image source={icons.upload} className="w-7 h-7 mr-3" />
                <Text className="text-gray-100 text-base font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
          <FormField
            value={form.prompt}
            handleTextChange={(text) =>
              setForm((prev) => ({ ...prev, prompt: text }))
            }
            label="AI Prompt"
            placeholder="Prompt used to generate your video"
          />
          <CustomButton
            label="Share Video"
            containerStyle={"my-5"}
            handlePress={handleSubmit}
            isLoading={uploading}
          />
        </View>
      </ScrollView>
    </ThemeView>
  );
};

export default Create;
