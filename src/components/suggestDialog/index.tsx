import './index.scss';
import { View, Text, Button, Input, Image } from '@tarojs/components';
import React, { useState } from 'react';
import cancel from '../../assets/icons/cancel.png';

interface SuggestDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (content: string) => void | Promise<void>;
}

// 建议反馈弹窗
const SuggestDialog: React.FC<SuggestDialogProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [inputValue, setInputValue] = useState('');

  if (!open) return null;

  const handleInput = e => {
    setInputValue(e.detail.value);
  };

  const handleSubmit = () => {
    onSubmit(inputValue);
  };

  return (
    <View className="suggest-dialog__mask">
      <View className="suggest-dialog__container">
        <Image
          className="suggest-dialog__close"
          src={cancel}
          onClick={onClose}
        />
        <View className="suggest-dialog__content">
          <Text>今天发生了什么让你皱眉的瞬间？</Text>
          <Text>我们准备好了倾听的耳朵和修改的笔尖~</Text>
          <View className="suggest-dialog__input-wrapper">
            <Input
              className="suggest-dialog__input"
              type="text"
              maxlength={200}
              value={inputValue}
              onInput={handleInput}
            />
          </View>
        </View>
        <View className="suggest-dialog__actions">
          <Button className="suggest-dialog__btn" onClick={handleSubmit}>
            发送反馈
          </Button>
        </View>
      </View>
    </View>
  );
};

export default SuggestDialog;
