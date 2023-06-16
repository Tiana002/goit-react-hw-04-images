import { MutatingDots } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <MutatingDots
      height="100"
      width="100"
      color="#05bac7"
      secondaryColor="#f933b7"
      radius="12.5"
      ariaLabel="mutating-dots-loading"
      wrapperStyle={{ marginLeft: 'auto', marginRight: 'auto' }}
      visible={true}
    />
  );
};