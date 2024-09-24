import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { PostItem } from './src/components/PostItem';
import { usePosts } from './src/hooks/usePosts';

function App(): React.JSX.Element {
  const { posts, loading, fetchPosts, handleLike, handleUnlike, userLikes } = usePosts();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <PostItem
            post={item}
            onLike={handleLike}
            onUnlike={handleUnlike}
            isLiked={userLikes.has(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Text style={styles.header}>Timeline</Text>}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
        onEndReached={fetchPosts}
        onEndReachedThreshold={0.1}
        contentContainerStyle={styles.flatListContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  flatListContent: {
    flexGrow: 1,
  },
});

export default App;
