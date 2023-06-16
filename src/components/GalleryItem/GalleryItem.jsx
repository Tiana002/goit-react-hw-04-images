import { Component } from "react";
import PropTypes from 'prop-types';
import { Modal } from "components/Modal/Modal";
import { Image, Item } from './GalleryItem.styled';

export class GalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  toggleModal = () => {
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen
    }));
  };
  
  render() {
    const { isModalOpen } = this.state;
    const { smallImage, largeImage, tags } = this.props;

    return (
      
      <Item>
        <Image
          src={smallImage}
          alt={tags}
          onClick={this.toggleModal}
        />
        {isModalOpen && (
          <Modal            
            largeImage={largeImage}
            tags={tags}
            isOpen={isModalOpen}
            onClose={this.toggleModal}
          />
        )}
      </Item>
      
    );
  }
}

GalleryItem.propTypes = {
    smallImage: PropTypes.string.isRequired,
    largeImage: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
 };
