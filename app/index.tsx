import React, { useState, useEffect } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Font from "expo-font";

// Konfigurasi grid dan ukuran gambar
const jumlahKolom = 3;
const lebarLayar = Dimensions.get("window").width;
const lebarItem = (lebarLayar / jumlahKolom) - 20;
const rasioUkuran = 925 / 1440;
const tinggiItem = lebarItem / rasioUkuran;

export default function GaleriInteraktif() {
  // Gambar utama
  const gambarUtama = [
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

  // Gambar alternatif (jumlah harus sama)
  const gambarAlternatif = [
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

  // Buat data awal grid
  const dataAwal = gambarUtama.map((gambar, i) => ({
    id: i,
    utama: gambar,
    alternatif: gambarAlternatif[i],
    aktif: false,
    skala: 1,
  }));

  type ItemGaleri = {
    id: number;
    utama: { uri: string };
    alternatif: { uri: string };
    aktif: boolean;
    skala: number;
  };

  const [dataGaleri, setDataGaleri] = useState<ItemGaleri[]>(dataAwal);
  const [fontLoaded, setFontLoaded] = useState(false);

  // Load font saat komponen dimount
  useEffect(() => {
    const loadFont = async () => {
      try {
        await Font.loadAsync({
          "SpaceMono-Regular": require("../assets/fonts/SpaceMono-Regular.ttf"),
        });
        setFontLoaded(true);
      } catch (error) {
        console.log("Error loading font:", error);
        setFontLoaded(true); // Tetap lanjut meski font gagal load
      }
    };
    loadFont();
  }, []);

  // Fungsi simulasi AI detection
  const deteksiAI = (gambar: { uri: string }) => {
    console.log("Mendeteksi gambar: ", gambar.uri);
  };

  // Saat gambar ditekan
  const tekanGambar = (index: number) => {
    setDataGaleri((lama) =>
      lama.map((item, i) => {
        if (i === index) {
          const skalaBaru = Math.min(item.skala * 1.2, 2);
          const aktifBaru = !item.aktif;
          deteksiAI(aktifBaru ? item.alternatif : item.utama);
          return {
            ...item,
            aktif: aktifBaru,
            skala: skalaBaru,
          };
        }
        return item;
      })
    );
  };

  // Tampilkan item grid
  const renderGaleri = ({ item, index }: { item: ItemGaleri; index: number }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => tekanGambar(index)}
      activeOpacity={0.85}
    >
      <View style={styles.frame}>
        <Image
          source={item.aktif ? item.alternatif : item.utama}
          style={[
            styles.gambar,
            {
              transform: [{ scale: item.skala }],
            },
          ]}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.layar}>
      {!fontLoaded ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={dataGaleri}
            renderItem={renderGaleri}
            keyExtractor={(item) => item.id.toString()}
            numColumns={jumlahKolom}
            showsVerticalScrollIndicator={false}
          />
          <Text style={styles.keterangan}>
            Klik gambar → ganti versi + AI detect + perbesar max 2x
          </Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  layar: {
    flex: 1,
    padding: 10,
    backgroundColor: "#1e1e1e",
  },
  item: {
    margin: 5,
  },
  frame: {
    borderWidth: 4,
    borderColor: "#ff69b4",
    borderRadius: 14,
    backgroundColor: "#333",
    padding: 2,
  },
  gambar: {
    width: lebarItem,
    height: tinggiItem,
    borderRadius: 12,
  },
  keterangan: {
    color: "#ccc",
    textAlign: "center",
    padding: 10,
    fontSize: 14,
    fontFamily: "SpaceMono-Regular",
    fontWeight: "400",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#ccc",
    fontSize: 16,
    fontFamily: "SpaceMono-Regular",
  },
});
