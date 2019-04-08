// @flow
function copyToClipboard(text: string) {
  const dummy = document.createElement('input');
  const { body } = document;

  if (body) {
    body.appendChild(dummy);
    dummy.setAttribute('value', text);
    dummy.select();
    document.execCommand('copy');
    body.removeChild(dummy);
  }
}

export default copyToClipboard;
