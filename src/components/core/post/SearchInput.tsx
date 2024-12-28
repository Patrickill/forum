import MyIcon from '@/components/common/MyIcon';
import useRoute from '@/hooks/support/useRouter';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { useState } from 'react';

const SearchInput = () => {
  const [searchKey, setSearchKey] = useState('');
  const { push, openNewTab } = useRoute();

  return (
    <InputGroup maxW={['auto', '250px']}>
      <InputLeftElement h={'full'} alignItems={'center'} display={'flex'} justifyContent={'center'}>
        <MyIcon color={'myGray.600'} name={'search'} w={'1rem'} h={'1rem'} />
      </InputLeftElement>
      <Input
        pl={'34px'}
        h={'100%'}
        minH={'30px'}
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            openNewTab({
              path: '/search',
              params: {
                q: searchKey,
              },
            });
          }
        }}
        placeholder={'搜索帖子'}
        py={0}
        lineHeight={'34px'}
        maxLength={30}
        bg={'white'}
      />
    </InputGroup>
  );
};

export default SearchInput;
