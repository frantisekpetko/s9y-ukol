import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View, Image, TouchableWithoutFeedback, Button } from 'react-native';
import axios from 'axios';

const Header = () => {
  return <View style={styles.header}>
    <View style={styles.headerTitleWrapper}><Text style={styles.headerTitle}>StarWars </Text></View>
    </View>
};

const Item = ({ item }) => {
  let baseImageUrl = 'https://raw.githubusercontent.com/RyanHemrick/star_wars_movie_app/master/public/images/';
  return <View style={styles.item}>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.subtitle}>Episode number: {item.episode_number}</Text>
    <View style={styles.imageContainer}>
      <Image styles={styles.logo} source={{
        uri: `${baseImageUrl}${item.poster}`,
        width: 250,
        height: 250
      }}/>
      <Text style={{marginTop: 15}}>
        {item.description}
      </Text>
      <View style={styles.mainCharactersContainer}>
        <Text style={styles.charactersHeading}>Main Characters</Text>
        {item.main_characters.map((item, index) => <Text style={styles.mainCharactersText} key={index}>{item}</Text>)}
      </View>

      <Image styles={styles.logo} source={{
        uri: `${baseImageUrl}${item.hero_image}`,
        width: 150,
        height: 150
      }}/>
    </View>

  </View>
};

const renderItem = ({ item }) => {
  return <Item item={item}/>
};

export default function App() {

  const [sortItemsAscend, setSortItemsAscend] = useState(true);

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);


  const sortItemsAscendOrDescend = (e) =>  {
    let items = data;
    if (sortItemsAscend) {
      console.log("descending");
      const data = items.sort((a, b) => Number(b.episode_number) - Number(a.episode_number));
      setData(data);
      setSortItemsAscend(false);
    }
    else {
      console.log("ascending");
      const data = items.sort((a, b) => Number(a.episode_number) - Number(b.episode_number));
      setData(data);
      setSortItemsAscend(true);
    }
  }
  
  useEffect(async () => {
    setLoading(true);
    const data = await axios.get('https://raw.githubusercontent.com/RyanHemrick/star_wars_movie_app/master/movies.json');
    setData(data.data.movies);
    setLoading(false);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header style={styles.item}/>
      {data.length === 0   && <Text style={styles.loadingText}>Loading ...</Text>}
      {data.length > 0  && <FlatList
        data={data}
        extraData={sortItemsAscend}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
      />}
      <View style={styles.footerButtonContainer}>
        <Button
            title={sortItemsAscend ? "Sort Items Descent" : "Sort Items Ascend" }
            color="orange"
            accessibilityLabel="Tap to Decrypt Data"
            onPress={(e) => sortItemsAscendOrDescend(e)}
            />  
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  footerButtonContainer: {
    marginLeft: '2.5%',
    marginRight: '2.5%',
    position: 'absolute',
    bottom: 0,
    width: '95%',
    height: 50,
    backgroundColor: 'white'

  },
  loadingText: {
    marginLeft: 15,
    fontSize: 32
  },
  mainCharactersContainer: {
    marginVertical: 15
  },
  mainCharactersText: {
    textAlign: 'center'
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c200',
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 15,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  charactersHeading: {
    fontSize: 20,
    textAlign: 'center'
  },
  logo: {
    width: 66,
    height: 58,
    flex: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    resizeMode: 'contain'
  },
  header: {
    height: 55,
    alignItems: 'center',
    backgroundColor: '#f9c200',
    flexDirection: 'row',
    marginTop: 40,
    marginBottom: 10,
    marginHorizontal: 16,
    paddingLeft: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  headerTitleWrapper: {
    flex: 2,
    justifyContent: 'center', 
    alignItems: 'center',
    alignContent: 'center'
  },
  headerTitle: {
      color: 'black',
      fontSize: 35,
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center'
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcon: {
      width: 45,
      height: 45,
  }
});
