import type { PortableTextBlock } from '@portabletext/types';
import type { ImageAsset, Slug } from '@sanity/types';
import groq from 'groq';

export const postQuery = groq`*[_type == "post" && slug.current == $slug][0]`;

export const postsQuery = groq`*[_type == "post"]{
  _id,
  title,
  slug,
  tags[]->{
    _id,
    name,
    slug
  },
  mainImage,
  body
} | order(_createdAt desc)`;

export interface Tagging {
  _id: string;
  tag: string;
  slug: { current: string }; 
}

export interface Post {
  _type: 'post';
  _createdAt: string;
  title?: string;
  slug: Slug;
  excerpt?: string;
  mainImage?: ImageAsset;
  tags: Tagging[]; // Corrected to Tagging[] to match the Tagging interface
  body: PortableTextBlock[];
}
