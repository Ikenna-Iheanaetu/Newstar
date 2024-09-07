import { Tabs } from 'expo-router';
import React from 'react';
import TabBar from '@/components/tabBar';


export default function TabLayout() {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
        }}
      />
    </Tabs>
  );
}
