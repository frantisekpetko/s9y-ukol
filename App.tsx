import React, {useEffect, useState, FC } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View, Image, Button } from 'react-native';
import axios from 'axios';
import lodash from 'lodash';

interface Movie {
  title: string,
  episode_number: string,
  main_characters: string[],
  description: string,
  poster: string,
  hero_image: string
}

const Header:FC = () => {
  return <View style={styles.header}>
    <View style={styles.headerTitleWrapper}><Text style={styles.headerTitle}>StarWars </Text></View>
    </View>
};

const renderItem:FC<{item: Movie}> = ({item}) => {
  let baseImageUrl = 'https://raw.githubusercontent.com/RyanHemrick/star_wars_movie_app/master/public/images/';
  return <View style={styles.item}>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.subtitle}>Episode number: {item.episode_number}</Text>
    <View style={styles.imageContainer}>
      <Image source={{
        uri: `${baseImageUrl}${item.poster}`,
        width: 250,
        height: 250
      }}/>
      <Text style={{marginTop: 15}}>
        {item.description}
      </Text>
      <View style={styles.mainCharactersContainer}>
        <Text style={styles.charactersHeading}>Main Characters</Text>
        {item?.main_characters?.map((itm:string, index:number) => <Text style={styles.mainCharactersText} key={index}>{itm}</Text>)}
      </View>

      <Image source={{
        uri: `${baseImageUrl}${item.hero_image}`,
        width: 150,
        height: 150
      }}/>
    </View>
  </View>
};

const App: FC = () =>  {
  const [sortItemsAscend, setSortItemsAscend] = useState(true);
  const [data, setData] = useState<Movie[]>([]);

  const sortItems = () =>  {
    console.log(sortItemsAscend ? "descending" : "ascending");
    const items:Movie[] = data.reverse();
    setData(items);
    setSortItemsAscend((prevState:boolean) => !prevState);
  }
  
  useEffect(() => {
    (async () => {
      const result = await axios.get('https://raw.githubusercontent.com/RyanHemrick/star_wars_movie_app/master/movies.json');
      setData([...result.data.movies]);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header/>
      {data.length === 0   && <Text style={styles.loadingText}>Loading ...</Text>}
      {data.length > 0  && <FlatList
        data={data}
        extraData={sortItemsAscend}
        renderItem={renderItem}
        keyExtractor={(item:Movie, index ) => {return String(index)} }
      />}
      <View style={styles.footerButtonContainer}>
        <Button
            title={sortItemsAscend ? "Sort Items Descent" : "Sort Items Ascend" }
            color="orange"
            accessibilityLabel="Tap to Decrypt Data"
            onPress={sortItems}
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

export default App;