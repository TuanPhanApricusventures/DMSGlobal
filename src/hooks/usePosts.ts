import { useState, useCallback, useEffect } from 'react';
import { Post } from '../types';
import { fetchTimelinePosts, likePost, unlikePost } from '../services/api';
import { Alert } from 'react-native';

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [userLikes, setUserLikes] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = useCallback(async () => {
    if (loading || !hasMore) {return;}
    setLoading(true);
    try {
      const response = await fetchTimelinePosts(page);
      setPosts((prevPosts) => [...prevPosts, ...response.data.data]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(page < response.data.totalPages);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  }, [hasMore, loading, page]);

  useEffect(() => {
    fetchPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLike = async (postId: string) => {
    try {
      await likePost(postId);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, likes_count: post.likes_count + 1 } : post
        )
      );
      setUserLikes((prevLikes) => new Set(prevLikes).add(postId));
    } catch (error) {
      Alert.alert('Error', 'Failed to like post');
    }
  };

  const handleUnlike = async (postId: string) => {
    try {
      await unlikePost(postId);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, likes_count: Math.max(0, post.likes_count - 1) } : post
        )
      );
      setUserLikes((prevLikes) => {
        const newLikes = new Set(prevLikes);
        newLikes.delete(postId);
        return newLikes;
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to unlike post');
    }
  };

  return { posts, loading, fetchPosts, handleLike, handleUnlike, userLikes };
}
