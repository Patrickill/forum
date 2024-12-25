import { getTopicList } from '@/api/core/topic';
import FillRowTabs from '@/components/common/Tabs/FillRowTabs';
import { useRequest2 } from '@/hooks/core/useRequest';
import { Flex } from '@chakra-ui/react';

const TopicTab = ({ value, setValue }: { value: string; setValue: (value: string) => void }) => {
  const { data: topicList, loading } = useRequest2(getTopicList, {
    manual: false,
  });

  return (
    topicList && (
      <Flex>
        <FillRowTabs
          value={value}
          onChange={setValue}
          list={[
            {
              label: '综合',
              value: '',
            },
            ...topicList?.map((item) => ({
              label: item.name,
              value: item.id,
            })),
          ]}
        />
      </Flex>
    )
  );
};

export default TopicTab;
