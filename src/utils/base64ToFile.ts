function base64ToFile(base64Data: string, fileName: string) {
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);

  // 创建 File 对象
  return new File([byteArray], fileName, { type: 'image/png' });
}

export default base64ToFile;
