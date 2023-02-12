// 3:29
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Constant from 'expo-constants';
import { useNavigation } from '@react-navigation/native'
import { getSinglePost, searchPosts } from '../api/post';
import PostListItem from './PostListItem';

const Search = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const navigation = useNavigation();

    const handleOnSubmit = async () => {
        if (!query.trim()) return;
        const { error, posts } = await searchPosts(query);

        if (error) return console.log(error);
        if (!posts.length) return setNotFound(true);
        setNotFound(false);
        setResults([...posts]);
    }

    const handlePostPress = async (slug) => {
        const { error, post } = await getSinglePost(slug);

        if (error) return console.log(error);
        navigation.navigate("PostDetail", { post });
    }

    return (
        <View style={styles.container}>
            <TextInput onSubmitEditing={handleOnSubmit} value={query} onChangeText={text => setQuery(text)} style={styles.searchInput} placeholder="Search" />
            <ScrollView contentContainerStyle={{ flex: 1 }}>
                {notFound ? <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 22, marginTop: 30, color: 'rgba(0, 0, 0, 0.3' }}>Result Not Found!</Text> :
                    results.map((post) => (
                        <View key={post.id} style={{ marginTop: 10 }}>
                            <PostListItem post={post} onPress={() => handlePostPress(post.slug)} />
                        </View>
                    ))}
            </ScrollView>
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    container: {
        paddingTop: Constant.statusBarHeight,
        padding: 10,
        flex: 1,
    },
    searchInput: {
        borderWidth: 2,
        borderColor: '#383838',
        borderRadius: 5,
        padding: 5,
        fontSize: 16,
    }
})