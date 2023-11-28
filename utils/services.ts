import * as ImagePicker from "expo-image-picker";

export const pickProfileImage = async (changeProfileImage: any) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [10, 10],
    quality: 1,
  });

  if (!result.canceled) {
    changeProfileImage(result.assets[0].uri);
  }
};
