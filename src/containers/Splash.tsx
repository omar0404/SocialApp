import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';

export function WithSplashScreen({
  children,
  isAppReady,
}: {
  isAppReady: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      {isAppReady && children}

      <Splash isAppReady={isAppReady} />
    </>
  );
}

export const Splash = ({ isAppReady }: { isAppReady: boolean }) => {
  const containerOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isAppReady) {
      Animated.timing(containerOpacity, {
        toValue: 0,
        duration: 1000,
        delay: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [isAppReady, containerOpacity]);

  return (
    <Animated.View
      collapsable={false}
      pointerEvents={'none'}
      style={[style.container, { opacity: containerOpacity }]}>
      <Text style={style.text}>Social App</Text>
    </Animated.View>
  );
};

const style = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 30,
  },
});
