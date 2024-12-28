import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDisclosure, Button, ModalBody, ModalFooter } from '@chakra-ui/react';
import { useMemoizedFn } from 'ahooks';
import MyModal from '@/components/common/MyModal';

export const useConfirm = (props?: {
  title?: string;
  iconSrc?: string | '';
  content?: string;
  showCancel?: boolean;
  type?: 'common' | 'delete';
  hideFooter?: boolean;
}) => {
  const map = useMemo(() => {
    const map = {
      common: {
        title: '确认操作吗?',
        variant: 'primary',
      },
      delete: {
        title: '确认删除吗?',
        variant: 'dangerFill',
      },
    };
    if (props?.type && map[props.type]) return map[props.type];
    return map.common;
  }, [props?.type]);

  const {
    title = map?.title || '警告',

    content,
    showCancel = true,
    hideFooter = false,
  } = props || {};
  const [customContent, setCustomContent] = useState<string | React.ReactNode>(content);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const confirmCb = useRef<Function>();
  const cancelCb = useRef<any>();

  const openConfirm = useMemoizedFn(
    (confirm?: Function, cancel?: any, customContent?: string | React.ReactNode) => {
      confirmCb.current = confirm;
      cancelCb.current = cancel;

      customContent && setCustomContent(customContent);

      return onOpen;
    }
  );

  const ConfirmModal = useMemoizedFn(
    ({
      closeText = '取消',
      confirmText = '确定',
      isLoading,
      bg,
      countDown = 0,
    }: {
      closeText?: string;
      confirmText?: string;
      isLoading?: boolean;
      bg?: string;
      countDown?: number;
    }) => {
      const timer = useRef<any>();
      const [countDownAmount, setCountDownAmount] = useState(countDown);
      const [requesting, setRequesting] = useState(false);

      useEffect(() => {
        if (isOpen) {
          setCountDownAmount(countDown);
          timer.current = setInterval(() => {
            setCountDownAmount((val) => {
              if (val <= 0) {
                clearInterval(timer.current);
              }
              return val - 1;
            });
          }, 1000);

          return () => {
            clearInterval(timer.current);
          };
        }
      }, [isOpen]);

      return (
        <MyModal isOpen={isOpen} title={title} maxW={['90vw', '400px']}>
          <ModalBody pt={5} whiteSpace={'pre-wrap'} fontSize={'sm'}>
            {customContent}
          </ModalBody>
          {!hideFooter && (
            <ModalFooter>
              {showCancel && (
                <Button
                  size={'sm'}
                  variant={'whiteBase'}
                  onClick={() => {
                    onClose();
                    typeof cancelCb.current === 'function' && cancelCb.current();
                  }}
                  px={5}
                >
                  {closeText}
                </Button>
              )}

              <Button
                size={'sm'}
                variant={map.variant}
                isDisabled={countDownAmount > 0}
                ml={3}
                isLoading={isLoading || requesting}
                px={5}
                onClick={async () => {
                  setRequesting(true);
                  try {
                    typeof confirmCb.current === 'function' && (await confirmCb.current());
                    onClose();
                  } catch (error) {}
                  setRequesting(false);
                }}
              >
                {countDownAmount > 0 ? `${countDownAmount}s` : confirmText}
              </Button>
            </ModalFooter>
          )}
        </MyModal>
      );
    }
  );

  return {
    openConfirm,
    onClose,
    ConfirmModal,
  };
};
