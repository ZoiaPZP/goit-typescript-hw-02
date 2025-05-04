import { FC } from 'react';
import styles from './ImageCard.module.css';
import { ImageData } from '../../types/types';

interface ImageCardProps {
  image: ImageData;
  onOpenModal: (image: ImageData) => void;
}

const ImageCard: FC<ImageCardProps> = ({ image, onOpenModal }) => {
  if (!image || !image.webformatURL) {
    console.error('No valid image data:', image);
    return null;
  }

  const imageUrl = image.webformatURL;
  const altText = image.tags || 'Image';

  console.log('Rendering image with URL:', imageUrl);

  return (
    <li className={styles.card} onClick={() => onOpenModal(image)}>
      <img src={imageUrl} alt={altText} className={styles.image} />
    </li>
  );
};

export default ImageCard;
