import React, { useRef, useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";

const ChupAnh = () => {
  // Quản lý quyền
  const [hasPer, setHasPer] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null); // State để lưu ảnh đã chụp
  const cameraRef = useRef();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPer(status === "granted");
    })();
  }, []);

  const chup = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log("Ảnh đã được chụp: ", photo.uri);
      setCapturedPhoto(photo.uri); // Cập nhật state với đường dẫn của ảnh mới chụp
    }
  };

  return (
    <View style={styles.container}>
      {hasPer ? (
        <View style={{ flex: 1, width: "100%" }}>
          <Camera
            style={styles.camera}
            ref={cameraRef}
            type={Camera.Constants.Type.back}
          />
          {capturedPhoto && (
            <Image
              source={{ uri: capturedPhoto }}
              style={styles.capturedImage}
            />
          )}
          {/* Hiển thị ảnh đã chụp nếu có */}
          <TouchableOpacity style={styles.captureButton} onPress={chup}>
            <Text style={styles.captureText}>Chụp ảnh</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text>Không có quyền truy cập camera</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  capturedImage: {
    width: 300,
    height: 300,
    resizeMode: "cover",
    marginTop: 20,
  },
  captureButton: {
    backgroundColor: "blue",
    padding: 10,
    margin: 20,
    alignItems: "center",
  },
  captureText: {
    color: "white",
    fontSize: 20,
  },
});

export default ChupAnh;
