import * as React from 'react';
import { TabView, SceneMap } from 'react-native-tab-view';
import Calculator from './HomePage/Calculator';
import Data from './HomePage/Data';
import Notification from './HomePage/Notification';
import Photo from './HomePage/Photo';

export default function Home() {
  
  const renderScene = SceneMap({
    0: Notification,
    1: Photo,
    2: Data,
    3: Calculator,
  });

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 0, title: 'Notify' },
    { key: 1, title: 'Photo' },
    { key: 2, title: 'Data' },
    { key: 3, title: 'Calculate' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex} />
  );
}