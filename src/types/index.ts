export interface User {
  id: string;
  first_name: string;
  last_name: string;
  profile_image_url: string;
  company_name: string;
}

export interface Post {
  id: string;
  created_at: string;
  text: string;
  user: User;
  likes_count: number;
  replies_count: number;
}

export interface TimelineResponse {
  data: Post[];
  totalPages: number;
  totalPosts: number;
}
