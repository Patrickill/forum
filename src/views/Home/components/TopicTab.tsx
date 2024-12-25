import { getTopicList } from '@/api/core/topic';
import FillRowTabs from '@/components/common/Tabs/FillRowTabs';
import { useRequest2 } from '@/hooks/core/useRequest';
import { TopicType } from '@/types/core/topic';
import { Flex } from '@chakra-ui/react';

const TopicTab = ({
  value,
  setValue,
  topicList,
}: {
  value: number;
  setValue: (value: number) => void;
  topicList: TopicType[];
}) => {
  return (
    topicList && (
      <Flex>
        <FillRowTabs<number>
          value={value}
          onChange={setValue}
          list={[
            // {
            //   label: '综合',
            //   value: '',
            // },
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
