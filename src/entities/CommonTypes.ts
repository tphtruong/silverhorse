export type Method =
  | 'get' | 'GET'
  | 'delete' | 'DELETE'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'

export interface Item {
  postId?: number,
  name: string,
  albumTitle?: string,
  postTitle?: string,
  userId: number,
}

export interface Album {
  id: number,
  userId: number,
  title: string,
}

export interface Post {
  id: number,
  userId: number,
  title: string,
  body: string,
}

export interface User {
  id: number,
  name: string,
  username?: string,
  email?: string,
}