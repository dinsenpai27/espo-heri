// import React, { useState } from "react";
// import {
//   Dimensions,
//   FlatList,
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// const columns = 3;
// const screenWidth = Dimensions.get("window").width;
// const imageSize = screenWidth / columns - 20;
// const aspectRatio = 925 / 1440;
// const imageHeight = imageSize / aspectRatio;

// export default function GalleryApp() {
//   // Gambar utama (lokal)
//   const mainImages = [
//     require("../assets/images/a01.png"),
//     require("../assets/images/a02.png"),
//     require("../assets/images/a03.png"),
//     require("../assets/images/a04.png"),
//     require("../assets/images/a05.png"),
//     require("../assets/images/a06.png"),
//     require("../assets/images/a07.png"),
//     require("../assets/images/a08.png"),
//     require("../assets/images/a09.png"),
//   ];

//   // Gambar alternatif (lokal)
//   const altImages = [
//     require("../assets/images/a10.png"),
//     require("../assets/images/a11.png"),
//     require("../assets/images/a12.png"),
//     require("../assets/images/a13.png"),
//     require("../assets/images/a14.png"),
//     require("../assets/images/a15.png"),
//     require("../assets/images/a16.png"),
//     require("../assets/images/a17.png"),
//     require("../assets/images/a18.png"),
//   ];

//   // Validasi panjang
//   if (mainImages.length !== altImages.length) {
//     console.warn("Jumlah gambar tidak cocok!");
//   }

//   type GalleryItem = {
//     id: number;
//     main: any;
//     alt: any;
//     isAlt: boolean;
//     scale: number;
//     error: boolean;
//   };

//   const [galleryData, setGalleryData] = useState<GalleryItem[]>(
//     mainImages.map((main, index) => ({
//       id: index,
//       main,
//       alt: altImages[index],
//       isAlt: false,
//       scale: 1,
//       error: false,
//     }))
//   );

//   const onImagePress = (index: number) => {
//     setGalleryData((prev) =>
//       prev.map((item, i) =>
//         i === index
//           ? {
//               ...item,
//               isAlt: !item.isAlt,
//             scale: Math.min(Number((item.scale * 1.2).toFixed(2)), 2),
//             }
//           : item
//       )
//     );
//   };

//   const onLongPress = (index: number) => {
//     setGalleryData((prev) =>
//       prev.map((item, i) =>
//         i === index ? { ...item, isAlt: false, scale: 1 } : item
//       )
//     );
//   };

//   const onImageError = (index: number) => {
//     setGalleryData((prev) =>
//       prev.map((item, i) =>
//         i === index ? { ...item, error: true } : item
//       )
//     );
//   };

//   const renderItem = ({ item, index }: { item: GalleryItem; index: number }) => (
//     <TouchableOpacity
//       style={styles.card}
//       onPress={() => onImagePress(index)}
//       onLongPress={() => onLongPress(index)}
//       activeOpacity={0.8}
//     >
//       <View style={[
//         styles.border,
//         {
//           borderColor: item.isAlt ? "#ff69b4" : "#666",
//           transform: [{ scale: item.scale }],
//         },
//       ]}>
//         {!item.error ? (
//           <Image
//             source={item.isAlt ? item.alt : item.main}
//             style={imageStyle}
//             resizeMode="contain"
//             onError={() => onImageError(index)}
//           />
//         ) : (
//           <View style={[imageStyle, styles.errorImage]}>
//             <Text style={styles.errorText}>Image Failed</Text>
//           </View>
//         )}

//         <View style={styles.scaleIndicator}>
//           <Text style={styles.scaleText}>{item.scale.toFixed(1)}x</Text>
//         </View>

//         {item.isAlt && (
//           <View style={styles.altIndicator}>
//             <Text style={styles.altText}>ALT</Text>
//           </View>
//         )}
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={galleryData}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id.toString()}
//         numColumns={columns}
//         showsVerticalScrollIndicator={false}
//       />
//       <Text style={styles.note}>
//         Tap: switch image + scale up (max 2x){"\n"}
//         Long press: reset image and scale
//       </Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: "#1e1e1e",
//   },
//   card: {
//     margin: 5,
//   },
//   border: {
//     borderWidth: 4,
//     borderRadius: 14,
//     backgroundColor: "#333",
//     padding: 2,
//     position: "relative",
//   },
//   scaleIndicator: {
//     position: "absolute",
//     top: 5,
//     right: 5,
//     backgroundColor: "rgba(0, 0, 0, 0.8)",
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 8,
//   },
//   scaleText: {
//     color: "#fff",
//     fontSize: 10,
//     fontWeight: "bold",
//   },
//   altIndicator: {
//     position: "absolute",
//     top: 5,
//     left: 5,
//     backgroundColor: "rgba(255, 105, 180, 0.9)",
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 8,
//   },
//   altText: {
//     color: "#fff",
//     fontSize: 9,
//     fontWeight: "bold",
//   },
//   note: {
//     color: "#ccc",
//     textAlign: "center",
//     padding: 10,
//     fontSize: 14,
//   },
//   errorImage: {
//     backgroundColor: "#444",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   errorText: {
//     color: "#ff6666",
//     fontSize: 10,
//     textAlign: "center",
//   },
// });

// // Dynamic style for image
// const imageStyle = {
//   width: imageSize,
//   height: imageHeight,
//   borderRadius: 12,
// };


//tugas 6
import {
  AntDesign,
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialIcons
} from '@expo/vector-icons';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

// Definisikan tipe untuk data ikon kita agar lebih aman dengan TypeScript
type IconData = {
  name: any; // 'name' bisa bervariasi tipenya, jadi 'any' cukup fleksibel di sini
  family: React.ComponentType<any>; // Tipe untuk komponen React
  label: string;
};

// Buat array data untuk 10 ikon yang akan ditampilkan
// Kita akan mencampur ikon dari keluarga yang berbeda
const icons: IconData[] = [
  { name: 'home', family: MaterialIcons, label: 'Home' },
  { name: 'settings', family: Ionicons, label: 'Settings' },
  { name: 'user', family: FontAwesome, label: 'Profile' },
  { name: 'shopping-cart', family: MaterialIcons, label: 'Cart' },
  { name: 'camera', family: Entypo, label: 'Camera' },
  { name: 'heart', family: AntDesign, label: 'Likes' },
  { name: 'mail', family: Ionicons, label: 'Inbox' },
  { name: 'search', family: FontAwesome, label: 'Search' },
  { name: 'lock', family: Entypo, label: 'Security' },
  { name: 'pie-chart', family: AntDesign, label: 'Stats' },
];

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Galeri 10 Ikon</Text>
        <View style={styles.iconGrid}>
          {icons.map((icon, index) => {
            // Kita gunakan 'as' untuk menunjuk komponen dinamis
            const IconComponent = icon.family; 
            return (
              <View key={index} style={styles.iconContainer}>
                <IconComponent name={icon.name} size={40} color="#333" />
                <Text style={styles.iconLabel}>{icon.label}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#1a1a1a',
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconLabel: {
    marginTop: 8,
    fontSize: 12,
    color: '#555',
  },
});