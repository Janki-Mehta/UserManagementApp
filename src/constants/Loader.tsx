import React, {
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import { Colors } from './colors';

export interface LoaderRef {
  toggleLoader: (shouldShow: boolean) => void;
}

const Loader = forwardRef<LoaderRef>((_, ref) => {
  const [loading, setLoading] = useState(false);

  useImperativeHandle(ref, () => ({
    toggleLoader: (shouldShow: boolean) => {
      setLoading(shouldShow);
    },
  }));

  if (!loading) return null;

  return (
    <View style={[styles.vwMain, { backgroundColor: Colors.blur }]}>
      <View style={[styles.vwWhite, { backgroundColor: Colors.white }]}>
        <ActivityIndicator size="large" color={Colors.lightBlue} />
      </View>
    </View>
  );
});

export default Loader;

const styles = StyleSheet.create({
  vwMain: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vwWhite: {
    borderRadius: 10,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
