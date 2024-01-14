import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TextInput, Pressable, Dimensions } from 'react-native';
import SideNavigationBar from './navbar';

const Shop = () => {
  const shopData = [
    {
      id: 5,
      userid: 'billy3',
      title: 'Old Needles',
      attachment: 'https://i.etsystatic.com/8276294/r/il/7c2d39/3309421459/il_fullxfull.3309421459_jzbj.jpg',
      description: '10/10 would recommend.',
      tags: ['knitting'],
      date: '2022-01-11',
    },
    {
      id: 2,
      userid: 'SadPianoMan',
      title: 'Piano Music Sheet',
      attachment: 'https://i.pinimg.com/originals/80/72/1e/80721eb348fe33024fd3d3fe9f5da1f7.png',
      description: 'Sheet music for a beautiful piano composition.',
      tags: ['piano'],
      date: '2022-01-14',
    },
    {
      id: 3,
      userid: 'soccerFanatic',
      title: 'Used Soccerball',
      attachment: 'https://th.bing.com/th/id/R.49a92cf2ea5338da085b060ae41f63cd?rik=ODQC8gc8YsznVw&pid=ImgRaw&r=0',
      description: 'A soccer ball with signs of use, perfect for soccer enthusiasts.',
      tags: ['soccer'],
      date: '2022-01-13',
    },
    {
      id: 4,
      userid: 'craftyHands',
      title: 'Crochet and Knitting Yarn',
      attachment: 'https://www.lemondedesucrette.com/wp-content/uploads/2014/04/4.jpg',
      description: 'High-quality yarn for crochet and knitting projects.',
      tags: ['crochet', 'knitting'],
      date: '2022-01-12',
    },
  ];

  const [items, setItems] = useState(shopData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const backendBaseUrl = 'http://localhost:8080';

  useEffect(() => {
    // Add any additional logic for fetching data from the backend if needed
  }, []);

  const filteredItems = items.filter(
    (item) =>
      (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))) &&
      (selectedTags.length === 0 || selectedTags.some((tag) => item.tags.includes(tag)))
  );

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemUserId}>{`User ID: ${item.userid}`}</Text>
      <Image source={{ uri: item.attachment }} style={styles.itemImage} />
      <Text style={styles.itemUserId}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.screenContainer}>
      <View style={styles.sidebar}>
        <SideNavigationBar />
      </View>
      <View style={styles.mainContainer}>
        <Text style={styles.headerText}>Shop</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            onChangeText={(text) => setSearchQuery(text)}
            value={searchQuery}
          />
          <View style={styles.tagContainer}>
            {Array.from(new Set(items.flatMap((item) => item.tags))).map((tag) => (
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
          data={filteredItems}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
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
  itemContainer: {
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
  itemImage: {
    width: '100%',
    height: '70%',
    borderRadius: 10,
    marginBottom: 5,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  itemUserId: {
    fontSize: 12,
    color: '#555',
  },
  columnWrapper: {

  },
  dynamicTag: {
    backgroundColor: 'lightgray',
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
  },
});

export default Shop;
