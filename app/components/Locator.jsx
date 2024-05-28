import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";

const App = () => {
  const [location, setLocation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [nearbyStores, setNearbyStores] = useState([]);
  const [noStoresNearby, setNoStoresNearby] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const storeNames = [
    { id: 1, name: "Tesco Express, London" },
    { id: 2, name: "Sainsbury's, London" },
    { id: 3, name: "Asda Southgate Circus Supercentre, lONDON" },
    {id: 4, name: "Lidl, London"},
    {
      id: 5,
      name: "Morrisons, London"

    },
    {
      id: 6,
      name: "Aldi"
    }

    
    // Add more stores here
  ];

  const geocodeStores = async () => {
    setIsLoading(true);
    const geocodedStores = [];
    for (const store of storeNames) {
      const geocode = await Location.geocodeAsync(store.name);
      if (geocode.length > 0) {
        geocodedStores.push({
          id: store.id,
          name: store.name,
          latitude: geocode[0].latitude,
          longitude: geocode[0].longitude,
        });
      }
    }
    setNearbyStores(geocodedStores);
    setNoStoresNearby(geocodedStores.length === 0);
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      await geocodeStores();
    })();
  }, []);

  const handleStorePress = (store) => {
    setLocation({
      latitude: store.latitude,
      longitude: store.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  return (
    <View style={{}}>
      <TouchableOpacity className="bg-primary px-2 py-3 rounded-lg"  onPress={() => setModalVisible(true)} >
        <Text className="text-white font-bold text-center" >
          Find Nearby Stores
        </Text>
      </TouchableOpacity>
      
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.container}>
          <MapView
            style={styles.map}
            region={location}
            showsUserLocation={true}
            loadingEnabled={true}
          >
            {location && (
              <Marker
                coordinate={location}
                title="You are here"
                description="This is your current location"
              />
            )}
            {nearbyStores.map((store) => (
              <Marker
                key={store.id}
                coordinate={{
                  latitude: store.latitude,
                  longitude: store.longitude,
                }}
                title={store.name}
              />
            ))}
          </MapView>
          <View style={styles.messageContainer}>
            <Text style={styles.headerText}>Food distribution centers: </Text>
            <ScrollView style={styles.scrollView}>
              {nearbyStores.map((store) => (
                <TouchableOpacity
                  key={store.id}
                  onPress={() => handleStorePress(store)}
                >
                  <Text style={styles.storeText}>{store.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Ionicons name="close" size={30} color="white" />
          </TouchableOpacity>
          {isLoading && (
            <View style={styles.loading}>
              <ActivityIndicator size="large" color="#2196F3" />
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  messageContainer: {
    flex: 0.3,
    padding: 20,
    backgroundColor: "#f2f3f4",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scrollView: {
    width: "100%",
  },
  storeText: {
    fontSize: 16,
    paddingVertical: 5,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "#136e63",
    borderRadius: 15,
    padding: 3,
  },
  loading: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
});

export default App;
