import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Platform, TextInput, Pressable, Dimensions } from 'react-native';
import SideNavigationBar from './navbar';

const ConnectAndExplore = () => {
  const postsExample = [
    { id: 1, userid: 1, title: 'Handmade Crochet Bag', attachment: 'https://d2droglu4qf8st.cloudfront.net/2016/05/281761/handmade-crochet-bag_ExtraLarge700_ID-1667706.jpg?v=1667706', description: 'A beautiful handmade crochet bag with intricate patterns.', tag: 'crochet', date: '2022-01-15' },
    { id: 2, userid: 2, title: 'Oil Painting: Sunset Landscape', attachment: 'https://th.bing.com/th/id/OIP.bBFOE2OriaV4XqnBFGs16wHaJ4?rs=1&pid=ImgDetMain', description: 'An oil painting capturing the beauty of a sunset over the mountains.', tag: 'painting', date: '2022-01-14' },
    { id: 3, userid: 3, title: 'Knitted Scarf', attachment: 'https://th.bing.com/th/id/R.5bbb079e82928fa1ed41134d17b0a38b?rik=9wobhdpPktROkQ&riu=http%3a%2f%2fwww.bindcrochet.com%2fwp-content%2fuploads%2f2018%2f10%2fhillas_wollgestrick_42403116_183521315874375_7808538388783087754_n.jpg&ehk=mmtCxf43iDNdkoI8Fi44SOYPLgUdfOzsXdGhWIf%2bvrI%3d&risl=&pid=ImgRaw&r=0', description: 'A cozy knitted scarf with a mix of warm colors for the winter season.', tag: 'knitting', date: '2022-01-13' },
    { id: 4, userid: 4, title: 'Piano Composition: Moonlight Sonata', attachment: 'https://example.com/moonlight-sonata.mp3', description: 'A musical composition for piano inspired by the moonlight.', tag: 'piano', date: '2022-01-12' },
    { id: 5, userid: 5, title: 'Hiking Adventure: Mountain Trail', attachment: 'https://example.com/hiking-mountain.jpg', description: 'A breathtaking view from a mountain trail during a hiking adventure.', tag: 'hiking', date: '2022-01-11' },

  ];
  

  const [posts, setPosts] = useState(postsExample);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const backendBaseUrl = 'http://localhost:8080';

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch posts from the backend
        // const response = await fetch(`${backendBaseUrl}/posts`);
        // const data = await response.json();
        // if (response.ok) {
        //   setPosts(data);
        // } else {
        //   console.error('Error fetching posts:', data);
        // }

        // For now, use the example posts
        setPosts(postsExample);
      } catch (error) {
        console.error('Error during fetchPosts:', error);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(
    (post) =>
      (post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tag.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedTags.length === 0 || selectedTags.some((tag) => post.tag.includes(tag)))
  );

  const renderPostItem = ({ item }) => (
    <View style={styles.postContainer}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postUserId}>{`User ID: ${item.userid}`}</Text>
      <Image source={{ uri: item.attachment }} style={styles.postImage} />
      <Text style={styles.postUserId}>{item.description}</Text>

    </View>
  );

  return (
    <View style={styles.screenContainer}>
      <View style={styles.sidebar}>
        <SideNavigationBar />
      </View>
      <View style={styles.mainContainer}>
        <Text style={styles.headerText}>Explore</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            onChangeText={(text) => setSearchQuery(text)}
            value={searchQuery}
          />
          <View style={styles.tagContainer}>
            {['crochet', 'knitting', 'piano', 'painting', 'hiking'].map((tag) => (
              <Pressable
                key={tag}
                style={({ pressed }) => [
                  styles.tagButton,
                  { backgroundColor: selectedTags.includes(tag) ? 'lightgray' : 'white' },
                ]}
                onPress={() => {
                  setSelectedTags((prevTags) =>
                    prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
                  );
                }}
              >
                <Text style={styles.tagButtonText}>{tag}</Text>
              </Pressable>
            ))}
          </View>
        </View>
        <FlatList
          data={filteredPosts.slice(0, filteredPosts.length / 1)}
          keyExtractor={(item) => `left-${item.id}`}
          renderItem={renderPostItem}
          numColumns={2}
        />
        <FlatList
          data={filteredPosts.slice(filteredPosts.length / 2)}
          keyExtractor={(item) => `right-${item.id}`}
          renderItem={renderPostItem}
          numColumns={2}
        />
      </View>
    </View>
  );
};

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
  headerText: {
    fontSize: 24,
    marginBottom: 10,
    padding: 10,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    width: '60%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  tagContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  tagButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  tagButtonText: {
    color: 'blue',
  },
  postContainer: {
    width: '25%',
    aspectRatio: 1, 
    backgroundColor: 'white',
    padding: 10,
    margin: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'space-between', 
  },
  postImage: {
    width: '100%',
    height: '70%', 
    borderRadius: 10,
    marginBottom: 5,
  },
  postTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  postUserId: {
    fontSize: 12,
    color: '#555',
  },
  columnWrapper: {
    flexDirection: 'row',
  },
  
});

export default ConnectAndExplore;
