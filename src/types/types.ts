export interface UnsplashImage {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string | null;
  user: {
    name: string;
    links: {
      html: string;
    };
  };
  likes: number;
  description: string | null;
}

export interface GalleryImage {
  id: string;
  webformatURL: string;
  largeImageURL: string;
  tags: string;
  user: string;
  userUrl: string;
  likes: number;
  description: string;
}

export interface ModalImage {
  id: number;
  webformatURL: string;
  largeImageURL: string;
  tags: string;
  user: string;
  userUrl: string;
  likes: number;
  description: string;
}

export interface ImageData {
  id: number;
  webformatURL: string;
  largeImageURL: string;
  tags: string;
  user: string;
  userUrl: string;
  likes: number;
  description?: string;
}

export interface UnsplashResponse {
  total: number;
  total_pages: number;
  results: UnsplashImage[];
}
