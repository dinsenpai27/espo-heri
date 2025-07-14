import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Define grid size and screen width before using them
const gridSize = 3; // Number of columns in the grid
const screenWidth = Dimensions.get("window").width;
const imageWidth = (screenWidth / gridSize) - 20;
const aspectRatio = 925 / 1440;
const imageHeight = imageWidth / aspectRatio;

export default function App() {
  // 9 gambar utama
  const gambar = [
    { uri: "https://hololive.hololivepro.com/wp-content/uploads/2024/10/bg_Nakiri-Ayame_01-925x1440.png" },
    { uri: "https://hololive.hololivepro.com/wp-content/uploads/2020/06/bg_Sakura-Miko_01-925x1440.png" },
    { uri: "https://hololive.hololivepro.com/wp-content/uploads/2020/06/bg_Shirogane-Noel_01-925x1440.png" },
    { uri: "https://hololive.hololivepro.com/wp-content/uploads/2020/06/bg_Amane-Kanata_01-925x1440.png" },
    { uri: "https://hololive.hololivepro.com/wp-content/uploads/2020/06/bg_Yukihana-Lamy_01-925x1440.png" },
    { uri: "https://hololive.hololivepro.com/wp-content/uploads/2024/06/bg_Omaru-Polka_01-925x1440.png" },
    { uri: "https://hololive.hololivepro.com/wp-content/uploads/2020/07/bg_Sakamata-Chloe_01-925x1440.png" },
    { uri: "https://hololive.hololivepro.com/wp-content/uploads/2022/04/3001_Ayunda-Risu-960x1440.png" },
    { uri: "https://hololive.hololivepro.com/wp-content/uploads/2024/06/bg_Kureiji-Ollie_01-925x1440.png" },
  ];

  // 9 gambar alternatif
  const altgambar = [
    { uri: "https://hololive.hololivepro.com/wp-content/uploads/2020/07/bg_Moona-Hoshinova_01-925x1440.png" },
    { uri: "https://hololive.hololivepro.com/wp-content/uploads/2020/07/bg_Vestia-Zeta_01-925x1440.png" },
    { uri: "https://hololive.hololivepro.com/wp-content/uploads/2020/07/talent_name_JP_Anya-Melfissa.png" },
    { uri: "https://hololive.hololivepro.com/wp-content/uploads/2020/07/bg_Kobo-Kanaeru_01-925x1440.png" },
    { uri: "https://hololive.hololivepro.com/wp-content/uploads/2020/07/bg_Ninomae-Inanis_01.png" },
    { uri: "https://hololive.hololivepro.com/wp-content/uploads/2024/10/bg_Nakiri-Ayame_01-925x1440.png" },
    { uri: "https://hololive.hololivepro.com/wp-content/uploads/2020/06/bg_Sakura-Miko_01-925x1440.png" },
    { uri: "https://hololive.hololivepro.com/wp-content/uploads/2020/06/bg_Yukihana-Lamy_01-925x1440.png" },
    { uri: "https://hololive.hololivepro.com/wp-content/uploads/2024/06/bg_Omaru-Polka_01-925x1440.png" },
  ];

  const initialData = gambar.map((gbr, index) => ({
    id: index,
    gambar: gbr,
    altgambar: altgambar[index],
    toggled: false,
    scale: 1,
  }));

  type GridItem = {
    id: number;
    gambar: { uri: string };
    altgambar: { uri: string };
    toggled: boolean;
    scale: number;
  };

  const [gridData, setGridData] = useState<GridItem[]>(initialData);

  const detectAI = (gambar: { uri: string }) => {
    console.log("AI detection running on:", gambar.uri);
    // Simulasi AI detection — bisa sambungkan API detection asli di sini
    // Fitur untuk deteksi gambar AI telah ditambahkan
  };

  const handlePress = (index: number) => {
    setGridData((prevData) =>
      prevData.map((item, idx) => {
        if (idx === index) {
          // Penskalaan gambar sebesar 1.2x saat diklik dengan pembatasan maksimum 2x
          const newScale = Math.min(item.scale * 1.2, 2);
          
          // Penggantian gambar dengan versi alternatif
          const toggled = !item.toggled;
          const newGambar = toggled ? item.altgambar : item.gambar;
          
          // Jalankan AI detection
          detectAI(newGambar);
          
          return {
            ...item,
            toggled,
            scale: newScale,
            gambar: newGambar,
          };
        }
        return item;
      })
    );
  };

  // Fungsi untuk reset gambar individual (long press)
  const resetItem = (index: number) => {
    setGridData((prevData) =>
      prevData.map((item, idx) => {
        if (idx === index) {
          return {
            ...item,
            toggled: false,
            scale: 1,
            gambar: gambar[index], // Kembali ke gambar asli
          };
        }
        return item;
      })
    );
  };
// kenapa tidak
const renderItem = ({ item, index }: { item: GridItem; index: number }) => (
  <TouchableOpacity
    style={styles.item}
    onPress={() => handlePress(index)}
    onLongPress={() => resetItem(index)} // Long press untuk reset
    activeOpacity={0.8}
  >
    <View style={[
      styles.imageWrapper,
      { 
        borderColor: item.toggled ? "#ff69b4" : "#666", // Border berubah warna saat toggled
        transform: [{ scale: item.scale }], // Scale wrapper, bukan hanya image
      }
    ]}>
      <Image
        source={item.gambar}
        style={styles.image}
        resizeMode="contain"
      />
      {/* Indicator skala */}
      <View style={styles.scaleIndicator}>
        <Text style={styles.scaleText}>{item.scale.toFixed(1)}x</Text>
      </View>
    </View>
  </TouchableOpacity>
);



  return (
    <View style={styles.container}>
      <FlatList
        data={gridData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={gridSize}
        showsVerticalScrollIndicator={false}
      />
      <Text style={styles.note}>
        Tap: ganti gambar + perbesar 1.2x (max 2x) + AI detection{'\n'}
        Long press: reset gambar & skala
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#1e1e1e",
  },
  item: {
    margin: 5,
  },
  imageWrapper: {
    borderWidth: 4,
    borderColor: "#ff69b4",
    borderRadius: 14,
    backgroundColor: "#333",
    padding: 2,
    position: "relative",
  },
  image: {
    width: imageWidth,
    height: imageHeight,
    borderRadius: 12,
  },
  scaleIndicator: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  scaleText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  note: {
    color: "#ccc",
    textAlign: "center",
    padding: 10,
    fontSize: 14,
  },
});
