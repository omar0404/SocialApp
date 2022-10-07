export declare type RootStackParamList = {
  Home: { posts: Post[] };
  PostDetails: { post: Post };
};
export declare type User = {
  id: number;
  name: string;
};
export declare type Post = {
  id: number;
  title: string;
  body: string;
  user_id?: number;
  user: User;
};
export declare type Comment = {
  id: number;
  name: string;
  body: string;
};
