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

// Atur grid dan ukuran gambar
const columns = 3;
const screenWidth = Dimensions.get("window").width;
const imageSize = (screenWidth / columns) - 20;
const aspectRatio = 925 / 1440;
const imageHeight = imageSize / aspectRatio;

export default function GalleryApp() {
  // Data gambar utama
  const mainImages = [
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

  // Data gambar alternatif (jumlah wajib sama)
  const altImages = [
    { uri: "https://hololive.hololivepro.com/wp-content/uploads/2020/07/bg_Moona-Hoshinova_01-925x1440.png" },
    { uri: "https://hololive.hololivepro.com/wp-content/uploads/2020/07/bg_Vestia-Zeta_01-925x1440.png" },
    { uri: "https://hololive.hololivepro.com/wp-content/uploads/2020/07/talent_name_JP_Anya-Melfissa.png" },
    { uri: "https://hololive.hololivepro.com/wp-content/uploads/2020/07/bg_Kobo-Kanaeru_01-925x1440.png" },
    { uri: "https://hololive.hololivepro.com/wp-content/uploads/2020/07/bg_Ninomae-Inanis_01.png" },
    { uri: "https://hololive.hololivepro.com/wp-content/uploads/2020/07/bg_Tokoyami-Towa_01-925x1440.png" },
    { uri: "https://hololive.hololivepro.com/wp-content/uploads/2020/06/bg_Hoshimachi-Suisei_01-925x1440.png" },
    { uri: "https://hololive.hololivepro.com/wp-content/uploads/2020/07/bg_Azki_01-925x1440.png" },
    { uri: "https://hololive.hololivepro.com/wp-content/uploads/2020/07/bg_Uruha-Rushia_01-925x1440.png" },
  ];

  // State data grid
  const initialData = mainImages.map((img, index) => ({
    id: index,
    main: img,
    alt: altImages[index],
    isAlt: false,
    scale: 1,
  }));

  type GalleryItem = {
    id: number;
    main: { uri: string };
    alt: { uri: string };
    isAlt: boolean;
    scale: number;
  };

  const [galleryData, setGalleryData] = useState<GalleryItem[]>(initialData);

  // Saat gambar diklik
  const onImagePress = (index: number) => {
    setGalleryData((prev) =>
      prev.map((item, i) => {
        if (i === index) {
          // Penskalaan individual pada setiap klik tanpa reset
          const newScale = Math.min(item.scale * 1.2, 2); // maksimal 2x
          
          // Toggle gambar alternatif
          const toggledAlt = !item.isAlt;
          
          return {
            ...item,
            isAlt: toggledAlt,
            scale: newScale, // Scale terus bertambah tanpa reset
          };
        }
        return item;
      })
    );
  };

  // Fungsi reset individual (long press)
  const onLongPress = (index: number) => {
    setGalleryData((prev) =>
      prev.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            isAlt: false, // Kembali ke gambar utama
            scale: 1, // Reset scale ke 1
          };
        }
        return item;
      })
    );
  };

  // Tampilkan tiap gambar
  const renderItem = ({ item, index }: { item: GalleryItem; index: number }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onImagePress(index)}
      onLongPress={() => onLongPress(index)} // Long press untuk reset
      activeOpacity={0.8}
    >
      <View style={[
        styles.border,
        { 
          borderColor: item.isAlt ? "#ff69b4" : "#666", // Border berubah warna
          transform: [{ scale: item.scale }], // Scale keseluruhan container
        }
      ]}>
        <Image
          source={item.isAlt ? item.alt : item.main}
          style={styles.image}
          resizeMode="contain"
        />
        {/* Indikator skala */}
        <View style={styles.scaleIndicator}>
          <Text style={styles.scaleText}>{item.scale.toFixed(1)}x</Text>
        </View>
        {/* Indikator gambar alternatif */}
        {item.isAlt && (
          <View style={styles.altIndicator}>
            <Text style={styles.altText}>ALT</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={galleryData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={columns}
        showsVerticalScrollIndicator={false}
      />
      <Text style={styles.note}>
        Tap: toggle gambar + perbesar 1.2x individual (max 2x){'\n'}
        Long press: reset gambar & skala ke awal
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
  card: {
    margin: 5,
  },
  border: {
    borderWidth: 4,
    borderColor: "#ff69b4",
    borderRadius: 14,
    backgroundColor: "#333",
    padding: 2,
    position: "relative",
  },
  image: {
    width: imageSize,
    height: imageHeight,
    borderRadius: 12,
  },
  scaleIndicator: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  scaleText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  altIndicator: {
    position: "absolute",
    top: 5,
    left: 5,
    backgroundColor: "rgba(255, 105, 180, 0.9)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  altText: {
    color: "#fff",
    fontSize: 9,
    fontWeight: "bold",
  },
  note: {
    color: "#ccc",
    textAlign: "center",
    padding: 10,
    fontSize: 14,
  },
});
