import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Pressable } from 'react-native';
import SideNavigationBar from './navbar';

const ConnectAndExplore = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const backendBaseUrl = 'http://localhost:8080';

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${backendBaseUrl}/posts`);
        const data = await response.json();
        if (response.ok) {
          setPosts(data);
        } else {
          console.error('Error fetching posts:', data);
        }
      } catch (error) {
        console.error('Error during fetchPosts:', error);
      }
    };

    fetchPosts();
  }, []);

  const selectableTags = ['crochet', 'knitting', 'piano', 'painting', 'hiking'];

  const handleTagPress = (tag) => {
    setSelectedTags((prevTags) => {
      if (prevTags.includes(tag)) {
        // If tag is already selected, remove it
        return prevTags.filter((selectedTag) => selectedTag !== tag);
      } else {
        // If tag is not selected, add it
        return [...prevTags, tag];
      }
    });
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedTags.length === 0 || selectedTags.some((tag) => post.tags.includes(tag)))
  );

  return (
    <View style={styles.screenContainer}>
      <View style={styles.sidebar}>
        <SideNavigationBar />
      </View>
      <View style={styles.mainContent}>
        <Text style={styles.headerText}>Explore</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          onChangeText={(text) => setSearchQuery(text)}
        />
        <View style={styles.tagContainer}>
          {selectableTags.map((tag) => (
            <Pressable
              key={tag}
              style={({ pressed }) => [
                styles.tag,
                {
                  backgroundColor: pressed
                    ? 'lightgray'
                    : selectedTags.includes(tag)
                    ? '#6fa3ef'
                    : '#aed9ff',
                },
              ]}
              onPress={() => handleTagPress(tag)}
            >
              <Text style={styles.tagText}>{tag}</Text>
            </Pressable>
          ))}
        </View>
        <FlatList
          data={filteredPosts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>Title: {item.title}</Text>
              <Text>Content: {item.content}</Text>
              {/* Add additional fields as needed */}
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
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
  mainContent: {
    flex: 1,
    marginLeft: 10,
  },
  headerText: {
    fontSize: 24,
    marginBottom: 10,
  },
  searchInput: {
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  tag: {
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  tagText: {
    color: 'white',
  },
});

export default ConnectAndExplore;
