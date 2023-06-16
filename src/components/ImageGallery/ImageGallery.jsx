import PropTypes from 'prop-types';
import { GalleryItem } from '../GalleryItem/GalleryItem';
import { List } from './ImageGallery.styled';


export const ImageGallery = ({ images }) => {
  return (
    <List>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <GalleryItem
            key={id}
            smallImage={webformatURL}
            largeImage={largeImageURL}
            tags={tags}
          />
        );
      })}
    </List>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};
