import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const UserProfileScreen = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#000' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
        <Image source={require('../../assets/icon.png')} style={{ width: 25, height: 25 }} />
        <Image source={require('../../assets/icon.png')} style={{ width: 25, height: 25 }} />
      </View>

      {/* Profile Section */}
      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <Image source={require('../../assets/icon.png')} style={{ width: 100, height: 100, borderRadius: 50 }} />
        <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 'bold', marginTop: 10 }}>Andrew Ainsley</Text>
        <Text style={{ color: '#FFFFFF', fontSize: 16, marginTop: 5 }}>Joined since 20 June 2020</Text>
      </View>

      {/* Statistics Section */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 20 }}>
        <View>
          <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>1,536</Text>
          <Text style={{ color: '#FFFFFF', fontSize: 16, textAlign: 'center' }}>followers</Text>
        </View>
        <View>
          <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>195</Text>
          <Text style={{ color: '#FFFFFF', fontSize: 16, textAlign: 'center' }}>following</Text>
        </View>
        <View>
          <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>15,274</Text>
          <Text style={{ color: '#FFFFFF', fontSize: 16, textAlign: 'center' }}>lifetime XP</Text>
        </View>
      </View>

      {/* XP and Achievements Section */}
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={{ color: '#FFFFFF', fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>Your Achievements</Text>

        {/* Achievement Items */}
        {/* This should be mapped from data ideally */}
        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
          <View style={{ marginRight: 15 }}>
            <Image source={require('../../assets/icon.png')} style={{ width: 50, height: 50 }} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>Great King</Text>
            <Text style={{ color: '#FFFFFF', fontSize: 14 }}>Get 5000 XP in this month to get achievements.</Text>
            {/* Progress Bar */}
            <View style={{ height: 20, backgroundColor: '#333333', borderRadius: 10, marginTop: 10 }}>
              <View style={{ width: '75%', height: '100%', backgroundColor: '#4C9A2A', borderRadius: 10 }} />
            </View>
          </View>
        </View>
        {/* Repeat for other achievements... */}
      </View>
      
      {/* Navigation Bar (Placeholder) */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 20 }}>
        {/* Placeholder for navigation items */}
        <Text style={{ color: '#FFFFFF' }}>Nav Item 1</Text>
        <Text style={{ color: '#FFFFFF' }}>Nav Item 2</Text>
        <Text style={{ color: '#FFFFFF' }}>Nav Item 3</Text>
        <Text style={{ color: '#FFFFFF' }}>Nav Item 4</Text>
      </View>

    </ScrollView>
  );
};

export default UserProfileScreen;
