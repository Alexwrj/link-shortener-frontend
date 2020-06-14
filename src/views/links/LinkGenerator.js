import React, { useState, useRef } from 'react';
import { Header, Input } from 'semantic-ui-react';
import { Toast } from 'react-bootstrap';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import useClipboard from 'react-hook-clipboard'

const mainStyle = {
  maxWidth: '1200px',
  padding: '30px 60px 30px 60px',
  margin: '0 auto',
}

const LinkGenerator = React.memo(() => {
  const [originLink, setOriginLink] = useState('');
  const [shortLink, setShortLink] = useState('');
  const [alias, setAlias] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [clipboard, copyToClipboard] = useClipboard();

  const toggleToast = () => setShowToast(!showToast);

  const refText = useRef('');

  const copyLink = () => {
    copyToClipboard(shortLink);
    toggleToast();
  };

  const handleChangeLink = ({ target }) => {
    setOriginLink(target.value);
  };

  const handleChangeAlias = ({ target }) => {
    setAlias(target.value);
  };

  const generateLink = () => {
    axios.post(`${process.env.REACT_APP_BASE_URL}/v1/short-link`, {
      origin: originLink,
      alias,
    }).then(({ data }) => setShortLink(`${process.env.REACT_APP_BASE_URL}/${data.shorten}`))
      .catch(({ response }) => console.error(response));
  };

  return(
    <div style={mainStyle}>
      <Header as="h1">Link generator</Header>
      <br />
      <Toast onClose={toggleToast} show={showToast} animation>
        <Toast.Header>
          <small>Success</small>
        </Toast.Header>
        <Toast.Body>Shorten linked copied.</Toast.Body>
      </Toast>
      <br />
      <Input 
        action={{
          color: 'teal',
          content: 'Generate',
          onClick: generateLink,
        }}
        placeholder="Input link"
        onChange={handleChangeLink}
      />
      <br />
      <br />
      <Input
        onChange={handleChangeAlias}
        value={alias}
        placeholder="Alias (optional)"
      />
      <br />
      <br />
      <Input
        ref={refText}
        action={{
          color: 'teal',
          labelPosition: 'right',
          icon: 'copy',
          content: 'Copy',
          onClick: copyLink,
        }}
        value={shortLink}
      />
    </div>
  );
});

export default LinkGenerator;
