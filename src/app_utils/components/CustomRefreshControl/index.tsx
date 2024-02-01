import React from 'react';
import { RefreshControl } from 'react-native';

interface CustomRefreshControlProps {
  loading: boolean;
  onRefresh: () => void;
}

const CustomRefreshControl: React.FC<CustomRefreshControlProps> = ({ loading, onRefresh }) => {
  return (
    <RefreshControl
      refreshing={loading}
      onRefresh={onRefresh}
      colors={['white']}
      tintColor={'white'}
    />
  );
};

export default CustomRefreshControl;