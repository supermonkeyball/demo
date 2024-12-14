import type { PortableTextBlock } from '@portabletext/types';
import type { ImageAsset, Slug } from '@sanity/types';
import groq from 'groq';

export const audioQuery = groq`*[_type == "audio" && slug.current == $slug][0]`;
export const postQuery = groq`*[_type == "post" && slug.current == $slug][0]`;
export const folderQuery = groq`*[_type == "folder" && slug.current == $slug][0]`;

export const audiosQuery = groq`*[_type == "audio" && defined(slug.current)] | order(_createdAt desc)`;
export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`;
export const foldersQuery = groq`*[_type == "folder" && defined(slug.current)] | order(_createdAt desc)`;

export interface Audio {
	_type: 'audio';
	_createdAt: string;
	title?: string;
	slug: Slug;
	excerpt?: string;
	file?: ImageAsset;
	myTags?: Array<Object>;
	body: PortableTextBlock[];
}

export interface Post {
	_type: 'post';
	_createdAt: string;
	title?: string;
	slug: Slug;
	excerpt?: string;
	mainImage?: ImageAsset;
	myTags?: Array<Object>;
	body: PortableTextBlock[];
}

export interface Folder {
	_type: 'folder';
	_createdAt: string;
	title?: string;
	slug: Slug;
	myTags?: Array<Object>;
}