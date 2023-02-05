//39: 35
import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
} from "react-native";

const data = [
  {
    id: "123",
    thumbnail:
      "https://images.pexels.com/photos/730564/pexels-photo-730564.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Know everything about crypto currency about crypto",
    author: "Admin",
  },
  {
    id: "1234",
    thumbnail:
      "https://images.pexels.com/photos/270360/pexels-photo-270360.jpeg?auto=compress&cs=tinysrgb&w=400",
    title: "Programming language to learn in 2023",
    author: "Admin",
  },
  {
    id: "12346",
    thumbnail:
      "https://images.pexels.com/photos/360438/pexels-photo-360438.jpeg?auto=compress&cs=tinysrgb&w=400",
    title: "How to make your first app with react and react native",
    author: "Admin",
  },
  {
    id: "12345",
    thumbnail:
      "https://images.pexels.com/photos/4974914/pexels-photo-4974914.jpeg?auto=compress&cs=tinysrgb&w=400",
    title: "Book to read as a programmer in 2023",
    author: "Admin",
  },
];

const width = Dimensions.get("window").width - 20;

export default function App() {
  const [dataToRender, setDataToRender] = useState([]);
  const [visibleSlideIndex, setVisibleSlideIndex] = useState(0);
  const flatList = useRef();
  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    setVisibleSlideIndex(viewableItems[0]?.index || 0);
  });

  const handleScrollTo = (index) => {
    flatList.current.scrollToIndex({ animated: false, index });
  };

  useEffect(() => {
    const newData = [[...data].pop(), ...data, [...data].shift()];
    setDataToRender([...newData]);
  }, [data.length]);

  useEffect(() => {
    const length = dataToRender.length;
    // reset slide to first
    if (visibleSlideIndex === length - 1 && length) {
      handleScrollTo(1);
    }

    // reset slide to last
    if (visibleSlideIndex === 0 && length) {
      handleScrollTo(length - 2);
    }
  }, [visibleSlideIndex]);
  return (
    <View style={styles.container}>
      <FlatList
        ref={flatList}
        data={dataToRender}
        keyExtractor={(item, index) => item.id + index}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={1}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current}
        renderItem={({ item }) => (
          <View>
            <Image
              source={{ uri: item.thumbnail }}
              style={{ width, height: width / 1.7, borderRadius: 7 }}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width,
    paddingTop: 50,
  },
});
