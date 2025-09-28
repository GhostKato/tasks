import React, { useRef, useEffect } from "react";
import { View, Animated, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const DOT_SIZE = 12;
const DOTS = 8;
const RADIUS = 40;

type LoaderProps = {
  fullScreen?: boolean;
};

export default function LoaderRunningDots({ fullScreen = false }: LoaderProps) {
  const animations = useRef([...Array(DOTS)].map(() => new Animated.Value(0))).current;

  useEffect(() => {
    animations.forEach((anim, i) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 100),
          Animated.timing(anim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  }, []);

  return (
    <View style={[styles.container, fullScreen && styles.fullScreen]}>
      {animations.map((anim, i) => {
        const angle = (i / DOTS) * 2 * Math.PI;
        const x = RADIUS * Math.cos(angle);
        const y = RADIUS * Math.sin(angle);

        const scale = anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.5, 1.2],
        });

        const opacity = anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.3, 1],
        });

        return (
          <Animated.View
            key={i}
            style={[
              styles.dot,
              {
                transform: [{ translateX: x }, { translateY: y }, { scale }],
                opacity,
                backgroundColor: "#19786fff",
              },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreen: {
    width,
    height,
    position: "absolute",
    top: 0,
    left: 0,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    position: "absolute",
  },
});
