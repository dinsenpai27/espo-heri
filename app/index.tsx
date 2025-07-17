import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Tentukan grid 3 kolom responsif
const columns = 3;
const screenWidth = Dimensions.get("window").width;
const imageSize = screenWidth / columns - 16;

export default function GalleryApp() {
  // URL gambar utama
  const mainImages = [
    "https://hololive.hololivepro.com/wp-content/uploads/2024/10/bg_Nakiri-Ayame_01-925x1440.png",
    "https://hololive.hololivepro.com/wp-content/uploads/2020/06/bg_Sakura-Miko_01-925x1440.png",
    "https://hololive.hololivepro.com/wp-content/uploads/2020/06/bg_Shirogane-Noel_01-925x1440.png",
    "https://hololive.hololivepro.com/wp-content/uploads/2020/06/bg_Amane-Kanata_01-925x1440.png",
    "https://hololive.hololivepro.com/wp-content/uploads/2020/06/bg_Yukihana-Lamy_01-925x1440.png",
    "https://hololive.hololivepro.com/wp-content/uploads/2024/06/bg_Omaru-Polka_01-925x1440.png",
    "https://hololive.hololivepro.com/wp-content/uploads/2020/07/bg_Sakamata-Chloe_01-925x1440.png",
    "https://hololive.hololivepro.com/wp-content/uploads/2022/04/3001_Ayunda-Risu-960x1440.png",
    "https://hololive.hololivepro.com/wp-content/uploads/2024/06/bg_Kureiji-Ollie_01-925x1440.png",
  ];

  // URL gambar alternatif (sejumlah sama)
  const altImages = [
    "https://hololive.hololivepro.com/wp-content/uploads/2020/07/bg_Moona-Hoshinova_01-925x1440.png",
    "https://hololive.hololivepro.com/wp-content/uploads/2020/07/bg_Vestia-Zeta_01-925x1440.png",
    "https://hololive.hololivepro.com/wp-content/uploads/2020/07/talent_name_JP_Anya-Melfissa.png",
    "https://hololive.hololivepro.com/wp-content/uploads/2020/07/bg_Kobo-Kanaeru_01-925x1440.png",
    "https://hololive.hololivepro.com/wp-content/uploads/2020/07/bg_Ninomae-Inanis_01.png",
    "https://hololive.hololivepro.com/wp-content/uploads/2020/07/bg_Tokoyami-Towa_01-925x1440.png",
    "https://hololive.hololivepro.com/wp-content/uploads/2020/06/bg_Hoshimachi-Suisei_01-925x1440.png",
    "https://hololive.hololivepro.com/wp-content/uploads/2020/07/bg_Azki_01-925x1440.png",
    "https://hololive.hololivepro.com/wp-content/uploads/2020/07/bg_Uruha-Rushia_01-925x1440.png",
  ];

  // State gambar berupa objek per item
  const [galleryData, setGalleryData] = useState(
    mainImages.map((uri, i) => ({
      id: i,
      mainUri: uri,
      altUri: altImages[i],
      isAlt: false,
      scale: 1,
      loading: false,
      error: false,
    }))
  );

  const handlePress = (idx: number) => {
    setGalleryData((prev) =>
      prev.map((item, i) =>
        i === idx
          ? {
              ...item,
              isAlt: !item.isAlt,
              scale: Math.min(item.scale * 1.2, 2),
            }
          : item
      )
    );
  };

  const handleLongPress = (idx: number) => {
    setGalleryData((prev) =>
      prev.map((item, i) =>
        i === idx ? { ...item, isAlt: false, scale: 1 } : item
      )
    );
  };

  const onLoadStart = (idx: number) =>
    setGalleryData((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, loading: true } : item))
    );
  const onLoadEnd = (idx: number) =>
    setGalleryData((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, loading: false } : item))
    );
  const onError = (idx: number) =>
    setGalleryData((prev) =>
      prev.map((item, i) =>
        i === idx ? { ...item, error: true, loading: false } : item
      )
    );

  const renderItem = ({ item, index }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handlePress(index)}
      onLongPress={() => handleLongPress(index)}
      activeOpacity={0.8}
    >
      {item.loading && <ActivityIndicator style={styles.loader} />}
      {item.error ? (
        <Text style={styles.errorText}>Failed to load</Text>
      ) : (
        <Image
          source={{ uri: item.isAlt ? item.altUri : item.mainUri }}
          style={[
            styles.image,
            { transform: [{ scale: item.scale }] },
          ]}
          resizeMode="cover"
          onLoadStart={() => onLoadStart(index)}
          onLoadEnd={() => onLoadEnd(index)}
          onError={() => onError(index)}
        />
      )}
      <View style={styles.scaleBadge}>
        <Text style={styles.scaleText}>{item.scale.toFixed(1)}x</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={galleryData}
        numColumns={columns}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        initialNumToRender={6}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 8 },
  card: {
    flex: 1 / columns,
    aspectRatio: 1,
    margin: 4,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  image: {
    width: imageSize,
    height: imageSize,
    borderRadius: 12,
  },
  loader: {
    position: "absolute",
  },
  errorText: {
    color: "red",
    fontSize: 10,
  },
  scaleBadge: {
    position: "absolute",
    bottom: 6,
    right: 6,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  scaleText: {
    color: "#fff",
    fontSize: 10,
  },
});
