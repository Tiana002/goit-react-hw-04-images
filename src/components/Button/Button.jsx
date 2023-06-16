import { Button } from './Button.styled';

export const LoadMore = ({ onLoadMore }) => {
  return (
    <Button type="button" onClick={onLoadMore()}>
      Load More
    </Button>
  );
};
