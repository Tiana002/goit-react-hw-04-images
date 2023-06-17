import { useState } from "react";
import PropTypes from 'prop-types';
import { Modal } from "components/Modal/Modal";
import { Image, Item } from './GalleryItem.styled';

 

export const  GalleryItem = ({ smallImage, largeImage, tags }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
 
 const toggleModal = () => {
  setIsModalOpen(isModalOpen => !isModalOpen);
  };

  return (
    <Item>
        <Image
          src={smallImage}
          alt={tags}
          onClick={toggleModal}
        />
        {isModalOpen && (
          <Modal            
            largeImage={largeImage}
            tags={tags}
            isOpen={isModalOpen}
            onClose={toggleModal}
          />
        )}
      </Item>
  )
}

GalleryItem.propTypes = {
    smallImage: PropTypes.string.isRequired,
    largeImage: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
 };
