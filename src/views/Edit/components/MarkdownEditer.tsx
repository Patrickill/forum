import React, { useState } from 'react';
import MDEditor, { MDEditorProps } from '@uiw/react-md-editor';
import { Box } from '@chakra-ui/react';

const MarkdownEditor = ({
  value,
  setValue,
  ...props
}: {
  value: string;
  setValue: (value: string) => void;
} & MDEditorProps) => {
  const extraCommands = [
    {
      name: 'uploadImage',
      buttonProps: {
        'aria-label': 'Upload Image',
      },
      icon: (
        <span role="img" aria-label="Upload Image">
          🖼️
        </span>
      ),
      execute: () => {
        console.log('upload image');
      },
    },
    {
      name: 'uploadFile', // 自定义上传文件的按钮
      buttonProps: {
        'aria-label': 'Upload File',
      },
      icon: (
        <span role="img" aria-label="Upload File">
          📄
        </span>
      ),
      execute: () => {
        console.log('upload file');
      },
    },
  ];

  return (
    <Box>
      <MDEditor
        {...props}
        value={value}
        onChange={(value) => setValue(value || '')}
        extraCommands={extraCommands}
      />
    </Box>
  );
};

export default MarkdownEditor;
