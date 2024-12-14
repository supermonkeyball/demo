import type { PortableTextBlock } from '@portabletext/types';
import type { ImageAsset, Slug } from '@sanity/types';
import groq from 'groq';

export const postQuery = groq`*[_type == "post" && slug.current == $slug][0]`;

export const postsQuery = groq`*[_type == "post"]{
  _id,
  title,
  slug,
  thumbnail,
  tags[]->{
    _id,
    tag,  
    slug
  },
  mainImage,
  audio {
    asset->{
      url,
      metadata { mimeType }
    }
  },
  body
} | order(title asc)`

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
  thumbnail?: ImageAsset;
  excerpt?: string;
  mainImage?: ImageAsset;
  tags: Tagging[]; 
  body: PortableTextBlock[];
  audio?: {
    asset: {
      url: string;
      metadata: {
        mimeType: string;
      };
    };
  };
}
