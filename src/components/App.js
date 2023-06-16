import { Component } from "react";
import { Container, Error } from "./Container.styled";
import { SearchBar } from "./SearchBar/SearchBar";
import { PostsApi } from 'services/Api'
import { GlobalStyle } from "GlobalStyle";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Loader } from "./Loader/Loader";
import { LoadMore } from "./Button/Button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { normalizeHits } from './utils/normalizeHits';

export class App extends Component {
  abortCtrl;
  state = {
    images: [],
    searchQuery: ``,
    page: 1,
    error: null,
    isLoading: false,
     isLastPage: false,
  };

componentDidUpdate(_, prevState) {
  if (
    prevState.searchQuery !== this.state.searchQuery ||
    prevState.page !== this.state.page) {
    this.getDataImages();
  }
}

handleSubmitSearchQuery = searchQuery => {
  if (this.state.searchQuery === searchQuery) {
    return;
  }

  this.setState({
    searchQuery,
    page: 1,
    images: [],
    error: null,
    isLastPage: false,
  });
};

getDataImages = async () => {
  const { searchQuery, page } = this.state;

  if (this.abortCtrl) {
    this.abortCtrl.abort();
  }

  this.abortCtrl = new AbortController();

  try {
    this.setState({ isLoading: true });

    const data = await PostsApi(
      searchQuery,
      page,
      this.abortCtrl.signal
    );

    if (data.hits.length === 0) {
      return toast.warn('Sorry, no images for your searchQuery...', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (page === 1) {
      toast.success('Wow! We found some images for you!', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.success('Wow! We found some more images for you!', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    const normalizedHits = normalizeHits(data.hits);

    this.setState(prevState => ({
      images: [...prevState.images, ...normalizedHits],
      isLastPage:
        prevState.images.length + normalizedHits.length >= data.totalHits,
      error: null,
    }));
  } catch (error) {
    this.setState({ error: error.message });
  } finally {
    this.setState({ isLoading: false });
  }

};

loading = () => {
  this.setState(prevState => ({
    page: prevState.page + 1,
  }));
};

render() {
  const { images, isLoading, error, isLastPage } = this.state;
  const lengthImages = images.length > 0;

  return (
    <Container>
      <SearchBar onSubmit={this.handleSubmitSearchQuery} />
      
      {error && <Error>Error: {error}</Error>}

      <ImageGallery images={images} />

      {isLoading && <Loader />}

      {lengthImages && !isLastPage && <LoadMore onLoadMore={() => this.loading} />}
      
        <ToastContainer autoClose={1000} />
      <GlobalStyle />
    </Container>
  );
}
}
