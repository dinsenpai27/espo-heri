import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f5",
        padding: 20,
      }}
    >
      {/* <ScrollView contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}> */}

      {/* Segitiga */}
      <View
        style={{
          width: 0,
          height: 0,
          borderLeftWidth: 60,
          borderRightWidth: 60,
          borderBottomWidth: 120,
          borderLeftColor: "transparent",
          borderRightColor: "transparent",
          borderBottomColor: "#4B7BE5",
          marginBottom: 40,
          opacity: 0.3,
          
        }}
      />

      {/* Persegi panjang isi Nama */}
      <View
        style={{
          backgroundColor: "#252A34",
          paddingVertical: 25,
          paddingHorizontal: 60,
          borderRadius: 15,
          marginBottom: 40,
          elevation: 5, // Android shadow
          shadowColor: "#000", // iOS shadow
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#00F7FF",
            letterSpacing: 1,
          }}
        >
          Dinda Safitri
        </Text>
      </View>

      {/* Bentuk Pil isi Stambuk */}
      <View
        style={{
          backgroundColor: "#3A4750",
          width: 260,
          height: 70,
          borderRadius: 35,
          justifyContent: "center",
          alignItems: "center",
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
        }}
      >
        <Text
          style={{
            fontSize: 26,
            fontWeight: "bold",
            color: "#FFFFFF",
            letterSpacing: 1,
          }}
        >
          105841109322
        </Text>
      </View>


      {/* <View style={{
        flexDirection: "row", // Menambahkan flexDirection untuk mengatur tata letak horizonta tidak meman

      }}> */}

      {/* Gambar Profil
      <Image style={{
        width: 200,
        height: 200,
        marginTop: 20, // margin atas untuk memberi jarak
      }}
        source={{ 
        uri: "https://simak.unismuh.ac.id/upload/mahasiswa/105841109322.jpg",

        }}>
        
  
      </Image>

            <Image style={{
        width: 200,
        height: 200,
        marginTop: 20, // margin atas untuk memberi jarak
      }}
        source={{ 
        uri: "https://uploads-us-west-2.insided.com/figma-en/attachment/7105e9c010b3d1f0ea893ed5ca3bd58e6cec090e.gif",

        }}></Image>
      </View>

      <View style={{
        flexDirection: "row", 
        // Menambahkan flexDirection untuk mengatur tata letak horizontal
      }}>
        </View>


       </ScrollView> */}
    </View>
  );
}
