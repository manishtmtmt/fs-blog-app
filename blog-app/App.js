// 1:32:28
import { useEffect, useState } from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import { getFeaturedPosts } from "./app/api/post";
import PostListItem from "./app/components/PostListItem";
import Seperator from "./app/components/Seperator";
import Slider from "./app/components/Slider";

const data = [
  {
    id: "123",
    thumbnail:
      "https://images.pexels.com/photos/730564/pexels-photo-730564.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Know everything about crypto currency about crypto",
    author: "Admin",
    createdAt: Date.now(),
  },
  {
    id: "1234",
    thumbnail:
      "https://images.pexels.com/photos/270360/pexels-photo-270360.jpeg?auto=compress&cs=tinysrgb&w=400",
    title: "Programming language to learn in 2023",
    author: "Admin",
    createdAt: Date.now(),
  },
  {
    id: "12346",
    thumbnail:
      "https://images.pexels.com/photos/360438/pexels-photo-360438.jpeg?auto=compress&cs=tinysrgb&w=400",
    title: "How to make your first app with react and react native",
    author: "Admin",
    createdAt: Date.now(),
  },
  {
    id: "12345",
    thumbnail:
      "https://images.pexels.com/photos/4974914/pexels-photo-4974914.jpeg?auto=compress&cs=tinysrgb&w=400",
    title: "Book to read as a programmer in 2023",
    author: "Admin",
    createdAt: Date.now(),
  },
];

export default function App() {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);

  const fetchFeaturedPosts = async () => {
    const { error, posts } = await getFeaturedPosts();
    if (error) return console.log(error);
    setFeaturedPosts(posts)
  }

  useEffect(() => {
    fetchFeaturedPosts();
  }, [])

  const ListHeaderComponent = () => {
    return (
      <View>
        {featuredPosts.length ? <Slider data={featuredPosts} title="Featured Posts" /> : null}
        <View style={{ marginTop: 15 }}>
          <Seperator width="90%" />
          <Text
            style={{
              fontWeigth: "700",
              color: "#383838",
              fontSize: 22,
              marginTop: 15,
            }}
          >
            Latest Posts
          </Text>
        </View>
      </View>
    );
  };
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingHorizontal: 10 }}
      ListHeaderComponent={ListHeaderComponent}
      ItemSeparatorComponent={() => <Seperator width="90%" style={{ marginTop: 15 }} />}
      renderItem={({ item }) => {
        return (
          <View style={{ marginTop: 15 }}>
            <PostListItem post={item} />
          </View>
        );
      }}
    />
  );
}
