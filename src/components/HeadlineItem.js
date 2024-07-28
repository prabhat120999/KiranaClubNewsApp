import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

const HeadlineItem = ({
  headline,
  onDelete,
  onPin,
  isPinned,
  onSwipeableOpen,
}) => {
  const swipeableRef = useRef(null);

  const renderRightActions = () => (
    <View style={styles.actionsContainer}>
      <TouchableWithoutFeedback
        onPress={() => {
          onDelete();
          if (swipeableRef.current) {
            swipeableRef.current.close();
          }
        }}
      >
        <View style={styles.alignItemCent}>
          <Image
            source={require("../../assets/Delete.png")}
            style={styles.delete}
          />
          <Text style={styles.actionText}>Delete</Text>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.width20} />
      <TouchableWithoutFeedback
        onPress={() => {
          onPin();
          if (swipeableRef.current) {
            swipeableRef.current.close();
          }
        }}
      >
        <View style={styles.alignItemCent}>
          <Image
            source={require("../../assets/PinWhite.png")}
            style={styles.delete}
          />
          <Text style={styles.actionText}>Pin</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );

  if (isPinned) {
    return (
      <View style={[styles.container, styles.pinnedContainer]}>
        <Text style={styles.title} numberOfLines={3}>{headline.title}</Text>
        <View style={styles.sourceContainer}>
          <Text style={styles.source}>{headline.source.name}</Text>
          <Text style={styles.time}>
            {new Date(headline.publishedAt).toLocaleTimeString()}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      onSwipeableWillOpen={() => onSwipeableOpen(swipeableRef.current)}
    >
      <View style={styles.container}>
        <Text style={styles.title} numberOfLines={3}>{headline.title}</Text>
        <View style={styles.sourceContainer}>
          <Text style={styles.source}>{headline.source.name}</Text>
          <Text style={styles.time}>
            {new Date(headline.publishedAt).toLocaleTimeString()}
          </Text>
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  pinnedContainer: {
    backgroundColor: "#e0f7fa",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    // fontFamily: 'Satoshi'
  },
  sourceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  source: {
    fontSize: 14,
    color: "#888",
  },
  time: {
    fontSize: 14,
    color: "#888",
  },
  actionsContainer: {
    paddingHorizontal: 20,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    backgroundColor: "#4BBDFC",
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    justifyContent: "center",
    alignItems: "center",
    height: "50%",
  },
  actionText: {
    color: "#fff",
    fontWeight: "400",
    fontSize: 12,
    marginTop: 4,
    // fontFamily: 'Satoshi'
  },
  delete: {
    height: 26,
    width: 26,
  },
  alignItemCent:{
    alignItems:'center'
  },
  width20:{
    width:20,
  }
});

export default HeadlineItem;
