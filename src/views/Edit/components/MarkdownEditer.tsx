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
  return (
    <Box>
      <MDEditor {...props} value={value} onChange={(value) => setValue(value || '')} />
    </Box>
  );
};

export default MarkdownEditor;
