import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Post } from '../types';

interface PostItemProps {
  post: Post;
  onLike: (postId: string) => void;
  onUnlike: (postId: string) => void;
  isLiked: boolean;
}

export function PostItem({ post, onLike, onUnlike, isLiked }: PostItemProps) {
  return (
    <TouchableOpacity style={styles.postContainer}
      onPress={() => isLiked ? onUnlike(post.id) : onLike(post.id)}>
      <Image source={{ uri: post.user.profile_image_url }} style={styles.profileImage} />
      <View style={styles.postContent}>
        <Text style={styles.userName}>{`${post.user.first_name} ${post.user.last_name}`}</Text>
        <Text style={styles.companyName}>{post.user.company_name}</Text>
        <Text style={styles.postText}>{post.text}</Text>
        <View style={styles.postStats}>
          <Text>{`${isLiked ? '❤️' : '🤍'} ${post.likes_count}`}</Text>
          <Text style={styles.count}>{`💬 ${post.replies_count}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#ffffff',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  postContent: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  companyName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  postText: {
    fontSize: 16,
    marginBottom: 8,
  },
  postStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  count: {
    paddingRight: 10,
  },
});
