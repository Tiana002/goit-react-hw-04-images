import { useState } from 'react';
import { Button, Form, Header, Input, Label } from './SearchBar.styled';
import { BsSearch } from 'react-icons/bs';

export const SearchBar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChangeSearchQuery = e => {
    setSearchQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    const trimSearchQuery = searchQuery.trim();

    if (trimSearchQuery === '') {
      return;
    }
    onSubmit(trimSearchQuery);
    setSearchQuery('');
  };

  return (
    <Header>
    <Form onSubmit={handleSubmit}>
      <Button type="submit">
        <Label>
          <BsSearch />
        </Label>
      </Button>

      <Input
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        value={searchQuery}
        onChange={handleChangeSearchQuery}
      />
    </Form>
  </Header>
  )
}




// export class SearchBar1 extends Component {
//   state = {
//     searchQuery: '',
//   };

//   handleChangeSearchQuery = e => {
//     const searchQuery = e.currentTarget.value.toLowerCase();

//     this.setState({ searchQuery });
//   };

//   handleSubmit = e => {
//     e.preventDefault();

//     const { searchQuery } = this.state;
//     const { onSubmit } = this.props;

//     if (searchQuery.trim() === '') {
//       return;
//     }

//     onSubmit(searchQuery);
//     this.setState({ searchQuery: '' });
//   };

//   render() {
//     const { searchQuery } = this.state;

//     return (
//       <Header>
//         <Form onSubmit={this.handleSubmit}>
//           <Button type="submit">
//             <Label>
//               <BsSearch />
//             </Label>
//           </Button>

//           <Input
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             value={searchQuery}
//             onChange={this.handleChangeSearchQuery}
//           />
//         </Form>
//       </Header>
//     );
//   }
// }
