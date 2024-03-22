import React, { useState, useRef, useEffect } from "react";
import { Audio } from "expo-av";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";

export default function NgheNhac() {
  const [playlist, setPlaylist] = useState([
    {
      id: 1,
      title: "Bài hát 1",
      uri: require("../assets/(Official MV) Gấp Đôi Yêu Thương - Tuấn Hưng.mp3"),
      image:
        "https://th.bing.com/th/id/OIP.GV32IT6NqXi-EclAh7SdAgHaEK?rs=1&pid=ImgDetMain",
    },
    {
      id: 2,
      title: "Bài hát 2",
      uri: require("../assets/Chiếc Khăn Gió Ấm (Lofi Lyrics) - Khánh Phương x meChill _ gửi cho em đêm lung linh Hot  Tiktok.mp3"),
      image:
        "https://th.bing.com/th/id/OIP.2oMvduclqTO-h3eoSZanhQAAAA?rs=1&pid=ImgDetMain",
    },
    {
      id: 3,
      title: "Bài hát 3",
      uri: require("../assets/Làm Người Yêu Anh Nhé Baby - Ba Chú Bộ Đội _ MV Lyrics HD.mp3"),
      image:
        "https://images.genius.com/0b4ce467719ed11345785897d45333d7.640x640x1.jpg",
    },
    {
      id: 4,
      title: "Bài hát 4",
      uri: require("../assets/Tìm Lại Bầu Trời - Tuấn Hưng.mp3"),
      image:
        "https://th.bing.com/th/id/OIP.-M8YvoFUAngznggawaIEVAAAAA?rs=1&pid=ImgDetMain",
    },
    {
      id: 5,
      title: "Bài hát 5",
      uri: require("../assets/TỪNG LÀ - VŨ CÁT TƯỜNG _ OFFICIAL.mp3"),
      image:
        "https://o.vdoc.vn/data/image/2024/03/04/loi-bai-hat-tung-la-vu-cat-tuong-700.jpg",
    },
  ]);

  const [sound, setSound] = useState(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const soundObject = useRef(null);

  useEffect(() => {
    if (soundObject.current !== null) {
      soundObject.current.unloadAsync();
    }
    loadSound();
  }, [currentTrackIndex]);

  async function loadSound() {
    const { sound } = await Audio.Sound.createAsync(
      playlist[currentTrackIndex].uri
    );
    sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    soundObject.current = sound;
    setSound(sound);
    setIsPlaying(false);
  }

  function onPlaybackStatusUpdate(status) {
    if (status.didJustFinish) {
      playNextTrack();
    }
  }

  async function playNextTrack() {
    const nextTrackIndex = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextTrackIndex);
  }

  async function playSound() {
    if (soundObject.current !== null) {
      if (isPlaying) {
        await soundObject.current.pauseAsync();
        setIsPlaying(false);
      } else {
        await soundObject.current.playAsync();
        setIsPlaying(true);
      }
    }
  }

  async function skipToPrevious() {
    const previousTrackIndex =
      (currentTrackIndex - 1 + playlist.length) % playlist.length;
    setCurrentTrackIndex(previousTrackIndex);
  }

  async function skipToNext() {
    const nextTrackIndex = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextTrackIndex);
  }

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={{
          uri: "https://img6.thuthuatphanmem.vn/uploads/2022/02/12/anh-nen-bien-cho-dien-thoai-tuyet-dep_030004711.jpg",
        }}
        style={{
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={styles.container}>
          <Image
            source={{ uri: playlist[currentTrackIndex].image }}
            style={styles.image}
          />
          <Text style={styles.title}>{playlist[currentTrackIndex].title}</Text>
          <View style={styles.controls}>
            <TouchableOpacity onPress={skipToPrevious} style={styles.button}>
              <Text style={styles.buttonText}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={playSound} style={styles.button}>
              <Text style={styles.buttonText}>
                {isPlaying ? "Pause" : "Play"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={skipToNext} style={styles.button}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 400,
    height: 200,
    marginBottom: 10,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  title: {
    color: "white",
    fontSize: 24,
    marginBottom: 20,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});
