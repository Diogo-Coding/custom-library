function copyCode(button) {
  const codeBlock = button.closest('.code').querySelector('.code-content');
  const range = document.createRange();
  range.selectNodeContents(codeBlock);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  document.execCommand('copy');
}

function toggleWrap(button) {
  const codeBlock = button.closest('.code').querySelector('.code-content');
  if (codeBlock.style.whiteSpace === 'pre-wrap') {
    codeBlock.style.whiteSpace = 'pre';
  } else {
    codeBlock.style.whiteSpace = 'pre-wrap';
  }
}