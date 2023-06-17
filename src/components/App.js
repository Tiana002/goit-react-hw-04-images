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
import { useState, useEffect, useRef } from "react";


export const App = () => {
  const abortController = useRef(null);
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const lengthImages = images.length > 0;
  const imagesPerPage = 12;

  useEffect(() => {
    if(searchQuery === '') {
      return;
    }
      const getDataImages = async () => {
        
        if (abortController.current) {
          abortController.current.abort();
        }
        abortController.current = new AbortController();
        try {
          setIsLoading(true);

          const data = await PostsApi(
            searchQuery,
            page,
            imagesPerPage,
            abortController.current.signal,
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
      
          setImages(prevImages => [...prevImages, ...normalizedHits]);
           setIsLastPage(page >= Math.ceil(data.totalHits / imagesPerPage));
          setError(null);
          
        } catch (error) {
          if (error.code !== 'ERR_CANCELED') {
            setError(error.message);
          }
        } finally {
          setIsLoading(false);
        }
      };
      getDataImages();
     }, [page, searchQuery]);

  const handleSubmitSearchQuery = newSearchQuery => {
    if (newSearchQuery === searchQuery) {
      return;
    }
  
    setSearchQuery(newSearchQuery);
    setPage(1);
    setImages([]);
    setError(null);
    setIsLastPage(false);
  };

 const handleClickLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <Container>
      <SearchBar onSubmit={handleSubmitSearchQuery} />
      
      {error && <Error>Error: {error}</Error>}

      <ImageGallery images={images} />

      {isLoading && <Loader />}

      {lengthImages && !isLastPage && <LoadMore onLoadMore={() => handleClickLoadMore} />}
      
        <ToastContainer autoClose={1000} />
      <GlobalStyle />
    </Container>
  )
}

// export class App1 extends Component {
//   abortCtrl;
//   state = {
//     images: [],
//     searchQuery: ``,
//     page: 1,
//     error: null,
//     isLoading: false,
//      isLastPage: false,
//   };

// componentDidUpdate(_, prevState) {
//   if (
//     prevState.searchQuery !== this.state.searchQuery ||
//     prevState.page !== this.state.page) {
//     this.getDataImages();
//   }
// }

// handleSubmitSearchQuery = searchQuery => {
//   if (this.state.searchQuery === searchQuery) {
//     return;
//   }

//   this.setState({
//     searchQuery,
//     page: 1,
//     images: [],
//     error: null,
//     isLastPage: false,
//   });
// };

// getDataImages = async () => {
//   const { searchQuery, page } = this.state;

//   if (this.abortCtrl) {
//     this.abortCtrl.abort();
//   }

//   this.abortCtrl = new AbortController();

//   try {
//     this.setState({ isLoading: true });

//     const data = await PostsApi(
//       searchQuery,
//       page,
//       this.abortCtrl.signal
//     );

//     if (data.hits.length === 0) {
//       return toast.warn('Sorry, no images for your searchQuery...', {
//         position: toast.POSITION.TOP_RIGHT,
//       });
//     } else if (page === 1) {
//       toast.success('Wow! We found some images for you!', {
//         position: toast.POSITION.TOP_RIGHT,
//       });
//     } else {
//       toast.success('Wow! We found some more images for you!', {
//         position: toast.POSITION.TOP_RIGHT,
//       });
//     }

//     const normalizedHits = normalizeHits(data.hits);

//     this.setState(prevState => ({
//       images: [...prevState.images, ...normalizedHits],
//       isLastPage:
//         prevState.images.length + normalizedHits.length >= data.totalHits,
//       error: null,
//     }));
//   } catch (error) {
//     this.setState({ error: error.message });
//   } finally {
//     this.setState({ isLoading: false });
//   }

// };

// handleClickLoadMore = () => {
//   this.setState(prevState => ({
//     page: prevState.page + 1,
//   }));
// };

// render() {
//   const { images, isLoading, error, isLastPage } = this.state;
//   const lengthImages = images.length > 0;

//   return (
//     <Container>
//       <SearchBar onSubmit={this.handleSubmitSearchQuery} />
      
//       {error && <Error>Error: {error}</Error>}

//       <ImageGallery images={images} />

//       {isLoading && <Loader />}

//       {lengthImages && !isLastPage && <LoadMore onLoadMore={() => this.handleClickLoadMore} />}
      
//         <ToastContainer autoClose={1000} />
//       <GlobalStyle />
//     </Container>
//   );
// }
// }


