import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const SettingsOption = ({ iconName, iconSize, iconColor, title, isSwitch, onToggle, switchValue }: {
    iconName: any;
    iconSize: number;
    iconColor: string;
    title: string;
    isSwitch: any;
    onToggle: any;
    switchValue: any;
}) => (
  <TouchableOpacity style={styles.option} onPress={onToggle}>
    <View style={[styles.iconBackground, { backgroundColor: iconColor }]}>
      <Ionicons name={iconName} size={iconSize} color="#fff" />
    </View>
    <Text style={styles.optionText}>
      {title}
    </Text>
    {isSwitch ? (
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={switchValue ? '#f5dd4b' : '#f4f3f4'}
        onValueChange={onToggle}
        value={switchValue}
      />
    ) : (
      <Ionicons name="ios-arrow-forward" size={20} color="#fff" />
    )}
  </TouchableOpacity>
);

const SettingsScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const settingsOptions = [
    { title: 'Personal Info', iconName: 'person-circle', iconColor: '#F5A623', isSwitch: false },
    // ...add other options here...
    { title: 'Dark Mode', iconName: 'moon', iconColor: '#4A90E2', isSwitch: true, switchValue: isDarkMode, onToggle: () => setIsDarkMode(!isDarkMode) },
    // ...add other options here...
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.headerText}>Settings</Text>
        {settingsOptions.map((option, index) => (
          <SettingsOption
            key={index}
            iconName={option.iconName}
            iconSize={24}
            iconColor={option.iconColor}
            title={option.title}
            isSwitch={option.isSwitch}
            onToggle={option.onToggle}
            switchValue={option.switchValue}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
  },
  content: {
    marginTop: 44,
    paddingHorizontal: 16,
  },
  headerText: {
    color: '#fff',
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  iconBackground: {
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    color: '#fff',
    flex: 1,
    marginLeft: 16,
  },
});

export default SettingsScreen;
