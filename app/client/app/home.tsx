import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  FlatList,
  Modal,
  TouchableOpacity,
  Dimensions,
  Platform
} from 'react-native';
import { WebView } from 'react-native-webview';

import SideNavigationBar from './navbar'; 


export default function HomeScreen() {
  /**
   * @brief Handles post upload.
   */
  const uploadPost = () => {
    // Implement post upload logic here
    // For example, you can open a modal for post creation
    // and add the created post to the userPosts array.
  };

  /**
   * @brief Displays links to user's posts.
   */
  const viewUserPosts = () => {
    // Implement logic to navigate to a page showing user's posts
    // You can use navigation libraries like React Navigation for this.
  };

  /**
   * @brief Displays user's achievements.
   */
  const viewAchievements = () => {
    // Implement logic to show user's achievements
    // You can use a modal or navigate to a separate page.
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{username}'s Dashboard</Text>
      </View>
      {/* ... (existing code) */}
      <View style={styles.componentContainer}>
        {/* ... (existing code) */}
        <View style={styles.actionButtonsContainer}>
          <Button title="Upload Post" onPress={uploadPost} />
          <Button title="View Posts" onPress={viewUserPosts} />
          <Button title="View Achievements" onPress={viewAchievements} />
        </View>
      </View>
    </View>
  );
}

  return (
    <View style={styles.screenContainer}>
      <View style={styles.sidebar}>
        <SideNavigationBar />
      </View>
      <Modal animationType="slide" transparent={false} visible={isCameraOpen}>
        <View style={styles.fullScreenCameraContainer}>
          {Platform.OS === 'web' ? (
            <iframe src={ADDRESS} height={'100%'} width={'100%'} />
          ) : (
            <WebView source={{ uri: ADDRESS }} />
          )}
          <TouchableOpacity onPress={() => closeCamera()} style={styles.closeCameraButton}>
            <Text style={styles.closeCameraButtonText}>Esc</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.componentContainer}>
        <View style={styles.cameraContainer}>
          <View style={styles.cameraFeedbackContainer}>
            {Platform.OS === 'web' ? (
              <iframe src={ADDRESS} style={{ flex: 1, width: '100%', height: 'auto' }} />
            ) : (
              <>
                {cameraFeedback ? (
                  <Image source={{ uri: cameraFeedback }} style={styles.cameraFeedbackImage} />
                ) : (
                  <Text style={styles.workInProgressText}>No Feed</Text>
                )}
              </>
            )}
          </View>
          <View style={styles.viewButtonContainer}>
            <Button title="View" onPress={() => viewFeedback()} />
          </View>
        </View>
        <View style={styles.connectedDevicesContainer}>
          <Text style={styles.connectedDevicesHeader}>Connected Devices</Text>
          <FlatList
            data={connectedDevices}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Text style={styles.connectedDeviceItem}>{item.name}</Text>
            )}
          />
        </View>
      </View>
    </View>
  );
}

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  screenContainer: {
    width: '100%',
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
  componentContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    marginLeft: 20,
    borderWidth: 2,
    borderColor: 'black',
  },
  cameraFeedbackContainer: {
    width: '100%',
    height: '80%',
    borderWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraFeedbackImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  workInProgressText: {
    fontSize: 16,
    color: 'gray',
  },
  connectedDevicesContainer: {
    width: '20%',
    padding: 10,
    marginLeft: 10,
    justifyContent: 'flex-start',
  },
  connectedDevicesHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  connectedDeviceItem: {
    fontSize: 12,
    marginVertical: 3,
  },
  fullScreenCameraContainer: {
    width: '100%',
    height: windowHeight,
  },
  closeCameraButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 5,
  },
  closeCameraButtonText: {
    color: 'white',
    fontSize: 12,
    padding: 2,
  },
  viewButtonContainer: {
    marginTop: 20,
    width: '10%',
    height: '20%',
    padding: 8,
  },
});