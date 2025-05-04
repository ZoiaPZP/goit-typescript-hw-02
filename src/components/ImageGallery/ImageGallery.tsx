import { FC } from 'react';
import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';
import { GalleryImage } from '../../types/types';

interface ImageGalleryProps {
  images: GalleryImage[];
  onOpenModal: (image: GalleryImage) => void;
}


export const ImageGallery: FC<ImageGalleryProps> = ({ images, onOpenModal }) => {
  console.log('Images received in ImageGallery:', images);

  return (
    <ul className={css.imageGallery}>
      {images.map((image) => (
        <ImageCard
          key={image.id}
          image={{ ...image, id: Number(image.id) }}
          onOpenModal={(imageData) => onOpenModal({ ...imageData, id: String(imageData.id), description: imageData.description || '' })}
        />
      ))}
    </ul>
  );
};
