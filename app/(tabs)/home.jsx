import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Categories from "../components/Categories";
import AppMenu from "../components/AppMenu";
import { auth, collection, db, getDocs } from "../../lib/firebase";
import { useGlobalContext } from "../services/userContext";
import { RenderItem } from "../components/RenderItem";
import DonationForm from "../components/DonationForm"; 

const logout = async () => {
  try {
    await auth.signOut();
    router.push("/signin");
    console.log("logged out");
  } catch (error) {
    console.log("Error logging out:", error);
    Alert.alert("Error", "Failed to log out.");
  }
};

const Home = () => {
  const { userName } = useGlobalContext();
  const [refresh, setRefresh] = useState(false);
  const [foodList, setFoodList] = useState([]);
  const [filteredFoodList, setFilteredFoodList] = useState([]);
  const [loading, setLoading] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefresh(true);
    await getFoodList();
    setRefresh(false);
  }, []);

  const getFoodList = useCallback(async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "foodList"));
      const fetchedFoodList = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        isborrowed: false,
      }));
      setFoodList(fetchedFoodList);
      setFilteredFoodList(fetchedFoodList); // Initially show all items
    } catch (err) {
      console.log(err);
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCategorySelect = (category) => {
    if (category === 'All') {
      setFilteredFoodList(foodList);
    } else {
      const filteredList = foodList.filter(item => item.category === category);
      setFilteredFoodList(filteredList);
    }
  };

  useEffect(() => {
    getFoodList();
  }, [getFoodList]);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredFoodList}
          renderItem={({ item }) => <RenderItem data={item} />}
          keyExtractor={(item) => item.id}
          onRefresh={onRefresh}
          refreshing={refresh}
          ListHeaderComponent={() => (
            <View>
              <AppMenu handleLogout={logout} userName={userName} />
              <Text style={styles.headerText}>Categories</Text>
              <Categories categoriesNames={foodList} onCategorySelect={handleCategorySelect} />
            </View>
          )}
          
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 8,
    marginLeft: 16,
  },
});

export default Home;
