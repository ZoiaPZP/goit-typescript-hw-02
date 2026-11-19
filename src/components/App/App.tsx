import { useState, useEffect, useCallback } from 'react';
import { Searchbar } from '../SearchBar/SearchBar';
import { fetchImages, onFetchError } from '../../api/unsplash';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../LoadMoreBtn/LoadMoreBtn';
import { Loader } from '../Loader/Loader';
import Notiflix from 'notiflix';
import { ImageModal } from '../ImageModal/ImageModal';
import { Toaster } from 'react-hot-toast';
import styles from './App.module.css';
import { ModalImage, GalleryImage } from '../../types/types';

const perPage = 12;

export default function App() {
  const [q, setQ] = useState<string>('');
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [btnLoadMore, setBtnLoadMore] = useState<boolean>(false);

  const [modal, setModal] = useState<{
    isShowModal: boolean;
    modalImage: ModalImage | null;
  }>({
    isShowModal: false,
    modalImage: null,
  });

  const getImages = useCallback(async () => {
    if (!q || !page) {
      Notiflix.Notify.failure('Please enter a valid search query and page number.');
      return;
    }

    try {
      setLoading(true);
      setBtnLoadMore(false);

      const fetchedImages = await fetchImages(q, page);
      if (!fetchedImages) {
        Notiflix.Notify.failure('Failed to fetch images. Please try again later.');
        return;
      }
      console.log(fetchedImages);

      if (fetchedImages.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again!'
        );
        setBtnLoadMore(false);
        return;
      }

      const arrPhotos: GalleryImage[] = fetchedImages.map(
        ({ id, urls, alt_description, user, likes, description }) => ({
          id,
          webformatURL: urls.small,
          largeImageURL: urls.regular,
          tags: alt_description || 'photo',
          user: user.name || 'Unknown',
          userUrl: `${user.links.html}?utm_source=zoia_image_search&utm_medium=referral`,
          likes,
          description: description || 'No description available',
        })
      );

      setImages(prevImages => [...prevImages, ...arrPhotos]);

      if (fetchedImages.length < perPage) {
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results");
        setBtnLoadMore(false);
      } else {
        setBtnLoadMore(true);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      onFetchError();
    } finally {
      setLoading(false);
    }
  }, [q, page]);

  useEffect(() => {
    if (q && page) {
      getImages();
    }
  }, [q, page, getImages]);

  const onSubmitSearchBar = (newQ: string) => {
    if (q === newQ) {
      Notiflix.Notify.info('Enter new request, please!');
      setBtnLoadMore(false);
      return;
    }

    setQ(newQ);
    setImages([]);
    setPage(1);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onOpenModal = (image: GalleryImage) => {
    if (!image || !image.largeImageURL) {
      Notiflix.Notify.failure("Sorry, we couldn't load the image for the modal.");
      return;
    }

    console.log('Modal image URL:', image.largeImageURL);

    setModal({
      isShowModal: true,
      modalImage: {
        id: Number(image.id),
        webformatURL: image.webformatURL,
        largeImageURL: image.largeImageURL,
        tags: image.tags || 'photo',
        user: image.user,
        userUrl: image.userUrl,
        likes: image.likes,
        description: image.description,
      },
    });
  };

  const onCloseModal = () => {
    setModal({
      isShowModal: false,
      modalImage: null,
    });
  };

  return (
    <>
      <Searchbar onSubmit={onSubmitSearchBar} />
      {loading && <Loader />}
      <ImageGallery images={images} onOpenModal={onOpenModal} />

      {btnLoadMore && <Button onLoadMore={onLoadMore} />}
      {modal.isShowModal && (
        <ImageModal modalImage={modal.modalImage} onCloseModal={onCloseModal} />
      )}
      <footer className={styles.footer}>
        Educational project · Photos from{' '}
        <a href='https://unsplash.com/?utm_source=zoia_image_search&utm_medium=referral' target='_blank' rel='noopener noreferrer'>
          Unsplash
        </a>
      </footer>
      <Toaster />
    </>
  );
}

