import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase"; // Adjust the import to your firebase config file

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "notifications"));
        const notificationsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotifications(notificationsList);
      } catch (error) {
        console.error("Error fetching notifications: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = async (id) => {
    try {
      const notificationRef = doc(db, "notifications", id);
      await updateDoc(notificationRef, { read: true });
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === id ? { ...notification, read: true } : notification
        )
      );
    } catch (error) {
      console.error("Error marking notification as read: ", error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Notifications</Text>
        <View style={styles.notificationsContainer}>
          {notifications.length === 0 ? (
            <View style={styles.placeholderContainer}>
              <Text style={styles.placeholderText}>No notifications available</Text>
            </View>
          ) : (
            notifications.map((notification) => (
              <TouchableOpacity
                key={notification.id}
                style={[styles.notification, notification.read && styles.readNotification]}
                onPress={() => markAsRead(notification.id)}
              >
                <AntDesign name="infocirlce" size={24} color="green" />
                <View style={styles.notificationTextContainer}>
                  <Text style={styles.notificationTitle}>{notification.title}</Text>
                  <Text>{notification.message}</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 12,
  },
  notificationsContainer: {
    padding: 10,
  },
  notification: {
    backgroundColor: "#f0f0f0",
    marginVertical: 5,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
  },
  readNotification: {
    backgroundColor: "#d3d3d3",
  },
  notificationTextContainer: {
    marginLeft: 10,
  },
  notificationTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  placeholderContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  placeholderText: {
    fontSize: 18,
    color: "#888",
  },
});

export default NotificationScreen;
