import React, {useEffect, useRef, forwardRef, useImperativeHandle} from 'react';
import {View, Animated, Easing, EasingFunction} from 'react-native';
import {transformer} from '../../metro.config';

type ImageFadeType = {
  duration?: number;
  delay?: number;
  easing?: EasingFunction;
  startOpacity?: number;
  endOpacity?: number;
  startScale?: number;
  endScale?: number;
  cardStyle?: Object;
  startAnimation: boolean;
  style: any;
  children: any;
};

const ImageFade: React.FC<ImageFadeType> = ({
  duration = 1400,
  delay = 2000,
  easing = Easing.linear,
  startOpacity = 1,
  endOpacity = 0,
  startScale = 1,
  endScale = 0.95,
  cardStyle = {},
  startAnimation,
  style,
  children,
}) => {
  const opacity1 = useRef(new Animated.Value(startOpacity)).current;
  const opacity2 = useRef(new Animated.Value(endOpacity)).current;
  const scale1 = useRef(new Animated.Value(startScale)).current;
  const scale2 = useRef(new Animated.Value(endScale)).current;

  useEffect(() => {
    if (startAnimation) {
      startAnimated();
    }
  }, [startAnimation]);

  const startAnimated = () => {
    Animated.parallel([
      Animated.timing(opacity1, {
        toValue: endOpacity,
        duration: duration,
        delay: delay,
        easing: easing,
        useNativeDriver: true,
      }),
      Animated.timing(scale1, {
        toValue: endScale,
        duration: duration,
        delay: delay,
        easing: easing,
        useNativeDriver: true,
      }),
      Animated.timing(opacity2, {
        toValue: startOpacity,
        duration: duration,
        delay: delay,
        easing: easing,
        useNativeDriver: true,
      }),
      Animated.timing(scale2, {
        toValue: startScale,
        duration: duration,
        delay: delay,
        easing: easing,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const imageAddStyle = {
    position: 'absolute',
    top: 0,
    left: '50%',
    right: 0,
    bottom: 0,
    // transform: [{translateX: -100}, {translateY: -126}],
  };

  return (
    <View style={[style, {position: 'relative'}]}>
      <Animated.View
        style={[
          {
            opacity: opacity1,
            transform: [{scale: scale1}],
          },
          imageAddStyle,
          cardStyle,
        ]}>
        {children[0]}
      </Animated.View>
      <Animated.View
        style={[
          {
            opacity: opacity2,
            transform: [{scale: scale2}],
          },
          imageAddStyle,
          cardStyle,
        ]}>
        {children[1]}
      </Animated.View>
    </View>
  );
};

export default ImageFade;
