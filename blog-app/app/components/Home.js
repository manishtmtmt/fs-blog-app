import { useCallback, useEffect, useState } from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import Constants from 'expo-constants';
import { getFeaturedPosts, getLatestPosts, getSinglePost } from "../api/post";
import PostListItem from "./PostListItem";
import Seperator from "./Seperator";
import Slider from "./Slider";

let pageNo = 0;
const limit = 5;

export default function Home({ navigation }) {
    const [featuredPosts, setFeaturedPosts] = useState([]);
    const [latestPosts, setLatestPosts] = useState([]);
    const [reachedToEnd, setReachedToEnd] = useState(false);
    const [busy, setBusy] = useState(false);

    const fetchFeaturedPosts = async () => {
        const { error, posts } = await getFeaturedPosts();
        if (error) return console.log(error);
        setFeaturedPosts(posts)
    }

    const fetchLatestPosts = async () => {
        const { error, posts } = await getLatestPosts(limit, pageNo);
        if (error) return console.log(error);
        setLatestPosts(posts)
    }

    const fetchMorePosts = async () => {
        if (reachedToEnd || busy) return;
        pageNo += 1;
        setBusy(true);
        const { error, posts, postCount } = await getLatestPosts(limit, pageNo);
        setBusy(false);
        if (error) return console.log(error);

        if (postCount === latestPosts.length) return setReachedToEnd(true);

        setLatestPosts([...latestPosts, ...posts])

    }

    useEffect(() => {
        fetchFeaturedPosts();
        fetchLatestPosts();

        return () => {
            pageNo = 0;
            setReachedToEnd(false);
        }
    }, [])

    const ListHeaderComponent = useCallback(() => {
        return (
            <View style={{ paddingTop: Constants.statusBarHeight }}>
                {featuredPosts.length ? <Slider onSlidePress={fetchSinglePost} data={featuredPosts} title="Featured Posts" /> : null}
                <View style={{ marginTop: 15 }}>
                    <Seperator />
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
    }, [featuredPosts]);

    const fetchSinglePost = async (postInfo) => {
        const slug = postInfo.slug || postInfo;
        const { error, post } = await getSinglePost(slug);

        if (error) console.log(error);
        navigation.navigate('PostDetail', { post })
    }

    const renderItem = ({ item }) => {
        return (
            <View style={{ marginTop: 15 }}>
                <PostListItem post={item} onPress={() => fetchSinglePost(item.slug)} />
            </View>
        );
    }

    const ItemSeparatorComponent = () => <Seperator width="90%" style={{ marginTop: 15 }} />

    return (
        <FlatList
            data={latestPosts}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}
            ListHeaderComponent={ListHeaderComponent}
            ItemSeparatorComponent={ItemSeparatorComponent}
            renderItem={renderItem}
            onEndReached={fetchMorePosts}
            onEndReachedThreshold={0}
            ListFooterComponent={() => {
                return reachedToEnd ? <Text style={{ fontWeight: 'bold', color: '#383838', textAlign: 'center', paddingVertical: 15 }}>{busy ? "Loading..." : "You reached to end!"}</Text> : null
            }}
        />
    );
}
