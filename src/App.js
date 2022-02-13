import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [issueText, setIssueText] = useState('');

  const handelInputChanged = (e) => {
    setInputText(e.target.value);
    console.log(inputText);
  };

  const handlePostIssue = () => {
    fetch('https://api.github.com/repos/2-now/minted-NFT/issues', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'token ' + process.env.REACT_APP_GIT_ISSUE_TOKEN,
      },
      body: JSON.stringify({
        title: inputText,
        body: `body: ${inputText}`,
      }),
    }).then((result) => {
      console.log(result);
    });
  };

  const handleGetIssue = () => {
    fetch('https://api.github.com/repos/2-now/minted-NFT/issues', {
      method: 'GET',
      headers: {
        Authorization: 'token ' + process.env.REACT_APP_GIT_ISSUE_TOKEN,
      },
    })
      .then((response) => response.json())
      .then((issues) => {
        setIssueText(issues[0].body);
        console.log(issues);
      });
  };

  return (
    <>
      <input type="text" onChange={(e) => handelInputChanged(e)}></input>
      <button onClick={handlePostIssue}>등록하기</button>
      <button onClick={handleGetIssue}>가져오기</button>
      <p>{issueText}</p>
    </>
  );
}

export default App;
