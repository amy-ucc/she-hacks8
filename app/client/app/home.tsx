import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Dimensions, Image } from 'react-native';

import SideNavigationBar from './navbar';

export default function HomeScreen() {
  // User information
  const [username, setUsername] = useState('User123'); 
  const [userPosts, setUserPosts] = useState<string[]>([]); 
  const [achievements, setAchievements] = useState<number>(0); 

  // Replace connectedDevices with mediaDevices
  const [mediaDevices, setMediaDevices] = useState([
    { id: 1, name: 'Device 1' },
  ]);

  /**
   * @brief Handles post upload.
   */
  const uploadPost = () => {
    // Implement post upload logic here
    // For example, you can open a modal for post creation
    // and add the created post to the userPosts array.
  };

  /**
   * @brief Updates achievements and displays images based on a certain number reached.
   */
  const updateAchievements = () => {
    // Implement logic to update achievements
    setAchievements(achievements + 1);
  };

  /**
   * @brief Renders images based on the achieved number.
   */
  const renderAchievements = () => {
    switch (achievements) {
      case 1:
        return <Image source={require('../assets/icon.png')} style={styles.achievementImage} />;
      case 2:
        return <Image source={require('../assets/icon.png')} style={styles.achievementImage} />;
      // Add more cases as needed
      default:
        return null;
    }
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.sidebar}>
        <SideNavigationBar />
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{username}'s Dashboard</Text>
        </View>
        <FlatList
          data={userPosts} 
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.postContainer}>
              <Text style={styles.postText}>{item}</Text>
            </View>
          )}
        />
        <View style={styles.actionButtonsContainer}>
          <Button title="Upload Post" onPress={uploadPost} />
        </View>
        <View style={styles.achievementsContainer}>
          <Text style={styles.achievementsHeader}>Achievements</Text>
          {renderAchievements()}
        </View>
      </View>
    </View>
  );
}

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  screenContainer: {
    width: '95%',
    height: windowHeight,
    flex: 1,
    flexDirection: 'row',
    margin: 20,
    marginTop: 40,
  },
  sidebar: {
    width: '12%', 
    backgroundColor: '#22354E',
    padding: 10,
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 5,
  },
  headerContainer: {
    width: '100%',
    padding: 10,
    backgroundColor: '#22354E',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  mediaDeviceItem: {
    fontSize: 12,
    marginVertical: 3,
  },
  actionButtonsContainer: {
    marginTop: 20,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  achievementsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  achievementsHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  achievementImage: {
    width: 100, 
    height: 100, 
    resizeMode: 'contain',
    marginBottom: 5,
  },
  postContainer: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  postText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

