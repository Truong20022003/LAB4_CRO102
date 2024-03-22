//npm i expo-image-picker
import React, { useState } from "react";
import { Text, View, Button, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
const ChonAnh = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const pickImage = async () => {
    let kq = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(kq);
    if (!kq.canceled) {
      setSelectedImage(kq.assets[0].uri);
    }
  };
  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <TouchableOpacity
        style={{
          backgroundColor: "blue",
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
          margin: 20,
        }}
        onPress={pickImage}
      >
        <Text style={{ textAlign: "center", color: "white", fontSize: 20 }}>
          Chọn ảnh từ thư viện
        </Text>
      </TouchableOpacity>
      <Image
        source={{ uri: selectedImage }}
        style={{ height: 300, width: 400 }}
      />
    </View>
  );
};
export default ChonAnh;
