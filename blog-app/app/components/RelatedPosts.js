import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PostListItem from './PostListItem';
import { getSimilarPost, getSinglePost } from '../api/post';

const RelatedPosts = ({ postId, onPostPress }) => {
    const [posts, setPosts] = useState([]);

    const fetchSimilarPosts = async () => {
        const { error, posts } = await getSimilarPost(postId);
        if (error) console.log(error);
        setPosts([...posts])
    }

    useEffect(() => {
        fetchSimilarPosts()
    }, [postId])

    return (
        posts.map((post) => (
            <View style={styles.container} key={post.id}>
                <PostListItem onPress={() => onPostPress(post.slug)} post={post} />
            </View>
        ))


    )
}

export default RelatedPosts

const styles = StyleSheet.create({
    container: {
        marginTop: 5
    }
})