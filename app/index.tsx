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

// Atur jumlah kolom dan ukuran gambar
const kolomGrid = 3;
const lebarLayar = Dimensions.get("window").width;
const lebarGambar = (lebarLayar / kolomGrid) - 20;
const rasioGambar = 925 / 1440;
const tinggiGambar = lebarGambar / rasioGambar;

export default function GaleriApp() {
  // Data gambar utama
  const daftarGambar = [
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

  // Data gambar alternatif
  const daftarAlternatif = [
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

  // Struktur awal data grid
  const dataAwal = daftarGambar.map((gambarUtama, idx) => ({
    kode: idx,
    utama: gambarUtama,
    cadangan: daftarAlternatif[idx],
    aktif: false,
    ukuran: 1,
  }));

  // Tipe data item grid
  type DataItem = {
    kode: number;
    utama: { uri: string };
    cadangan: { uri: string };
    aktif: boolean;
    ukuran: number;
  };

  const [dataGaleri, setDataGaleri] = useState<DataItem[]>(dataAwal);

  // Fungsi deteksi AI simulasi
  const deteksiGambar = (gambar: { uri: string }) => {
    console.log("Deteksi AI: ", gambar.uri);
  };

  // Fungsi klik gambar
  const saatDitekan = (index: number) => {
    setDataGaleri((dataLama) =>
      dataLama.map((item, idx) => {
        if (idx === index) {
          const ukuranBaru = Math.min(item.ukuran * 1.2, 2);
          const statusBaru = !item.aktif;
          deteksiGambar(statusBaru ? item.cadangan : item.utama);
          return {
            ...item,
            aktif: statusBaru,
            ukuran: ukuranBaru,
          };
        }
        return item;
      })
    );
  };

  // Tampilkan setiap item
  const tampilkanItem = ({ item, index }: { item: DataItem; index: number }) => (
    <TouchableOpacity
      style={styles.kartu}
      onPress={() => saatDitekan(index)}
      activeOpacity={0.85}
    >
      <View style={styles.pembungkusGambar}>
        <Image
          source={item.aktif ? item.cadangan : item.utama}
          style={[
            styles.gambar,
            {
              transform: [{ scale: item.ukuran }],
            },
          ]}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );

  // Komponen utama
  return (
    <View style={styles.layar}>
      <FlatList
        data={dataGaleri}
        renderItem={tampilkanItem}
        keyExtractor={(item) => item.kode.toString()}
        numColumns={kolomGrid}
        showsVerticalScrollIndicator={false}
      />
      <Text style={styles.keterangan}>
        Ketuk gambar → ganti alternatif + deteksi AI + perbesar
      </Text>
    </View>
  );
}

// Style komponen
const styles = StyleSheet.create({
  layar: {
    flex: 1,
    padding: 10,
    backgroundColor: "#1e1e1e",
  },
  kartu: {
    margin: 5,
  },
  pembungkusGambar: {
    borderWidth: 4,
    borderColor: "#ff69b4",
    borderRadius: 14,
    backgroundColor: "#333",
    padding: 2,
  },
  gambar: {
    width: lebarGambar,
    height: tinggiGambar,
    borderRadius: 12,
  },
  keterangan: {
    color: "#ccc",
    textAlign: "center",
    padding: 10,
    fontSize: 14,
  },
});
