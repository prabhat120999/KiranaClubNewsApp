import React, { useEffect, useState, useRef } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeadlineItem from "../components/HeadlineItem";
import { fetchHeadlines } from "../services/api";
import { storeHeadlines, getStoredHeadlines } from "../utils/storage";

const HomeScreen = ({ navigation }) => {
  const [headlines, setHeadlines] = useState([]);
  const [pinnedHeadline, setPinnedHeadline] = useState(null);
  const [dripTimer, setDripTimer] = useState(null);
  const swipeableRef = useRef(null);

  useEffect(() => {
    const loadHeadlines = async () => {
      const storedHeadlines = await getStoredHeadlines();
      if (storedHeadlines.length === 0) {
        const fetchedHeadlines = await fetchHeadlines();
        setHeadlines(fetchedHeadlines.slice(0, 10));
        storeHeadlines(fetchedHeadlines);
      } else {
        setHeadlines(storedHeadlines.slice(0, 10));
      }
    };
    loadHeadlines();
  }, []);

  useEffect(() => {
    setDripTimer(
      setInterval(() => {
        introduceNewBatch();
      }, 10000)
    );

    return () => clearInterval(dripTimer);
  }, [headlines]);

  const introduceNewBatch = async () => {
    const storedHeadlines = await getStoredHeadlines();
    const currentLength = headlines.length;
    if (currentLength < storedHeadlines.length) {
      const newBatch = storedHeadlines.slice(currentLength, currentLength + 5);
      setHeadlines(prevHeadlines => [
        ...(pinnedHeadline ? [pinnedHeadline] : []),
        ...newBatch,
        ...prevHeadlines,
      ]);
    } else {
      const newHeadlines = await fetchHeadlines();
      setHeadlines([
        ...(pinnedHeadline ? [pinnedHeadline] : []),
        ...newHeadlines.slice(0, 10),
      ]);
      storeHeadlines(newHeadlines);
    }
  };

  const handleManualFetch = () => {
    clearInterval(dripTimer);
    introduceNewBatch();
    setDripTimer(
      setInterval(() => {
        introduceNewBatch();
      }, 10000)
    );
  };

  const handleDelete = (index) => {
    setHeadlines(prevHeadlines => prevHeadlines.filter((_, i) => i !== index));
  };

  const handlePin = (index) => {
    const pinned = headlines[index];
    setPinnedHeadline(pinned);
    setHeadlines(prevHeadlines => prevHeadlines.filter((_, i) => i !== index));
  };

  const handleUnpin = () => {
    if (pinnedHeadline) {
      setHeadlines(prevHeadlines => [pinnedHeadline, ...prevHeadlines]);
      setPinnedHeadline(null); // Clear pinned headline
    }
  };

  const handleSwipeableOpen = (ref) => {
    if (swipeableRef.current && swipeableRef.current !== ref) {
      swipeableRef.current.close(); // Close previous swipeable
    }
    swipeableRef.current = ref; // Set new swipeable ref
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("../../assets/splash.png")}
            style={styles.headerImage}
          />
          <TouchableOpacity onPress={handleManualFetch}>
            <Image
              source={require("../../assets/Refresh.png")}
              style={styles.refresh}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={headlines}
          renderItem={({ item, index }) => {
            if (pinnedHeadline && pinnedHeadline.title === item.title) return null;
            return (
              <HeadlineItem
                headline={item}
                onDelete={() => handleDelete(index)}
                onPin={() => handlePin(index)}
                isPinned={pinnedHeadline && pinnedHeadline.title === item.title}
                onSwipeableOpen={handleSwipeableOpen}
              />
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={
            pinnedHeadline ? (
              <View style={styles.pinnedContainer}>
                <View style={styles.fdRow}>
                  <Image
                    source={require("../../assets/Pin.png")}
                    style={styles.pin}
                  />
                  <Text style={styles.pinnedLabel}>Pinned on top</Text>
                </View>
                <HeadlineItem
                  headline={pinnedHeadline}
                  onDelete={() => setPinnedHeadline(null)}
                  onPin={() => {}}
                  isPinned={true}
                  onSwipeableOpen={handleSwipeableOpen}
                />
              </View>
            ) : null
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  pinnedContainer: {
    backgroundColor: "#f8f8f8",
  },
  pinnedLabel: {
    fontSize: 12,
    color: "#000000",
    marginLeft: 4,
    // fontFamily: 'Satoshi',
    fontWeight:'400'
  },
  headerImage: {
    height: 31,
    width: 111,
  },
  refresh: {
    height: 28,
    width: 28,
  },
  pin: {
    height: 10,
    width: 10,
  },
  fdRow: { flexDirection: "row", alignItems: 'center', paddingHorizontal: 16, paddingTop: 16 }
});

export default HomeScreen;
