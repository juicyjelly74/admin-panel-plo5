import { useState } from 'react';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';

import './App.css';

function App() {
  const [url, setUrl] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [method, setMethod] = useState<string>('GET');
  const [requestResponse, setRequestResponse] = useState<string>('');

  enum RequestMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
  }
  function sendApiRequest() {
    const requestOptions = {
      url,
      method,
      headers: { 'Content-Type': 'application/json' },
      body: method === RequestMethod.GET ? null : body
  };
    ajax(requestOptions).pipe(map(
      res => {
        setRequestResponse(JSON.stringify(res));
        return of();
      }),      
      catchError(error => {
        setRequestResponse(JSON.stringify(error));
        return of();
      })
    )    
    .subscribe(() => {})
  }

  return (
    <div className="App">
      <div className="App-body">        
        <div className="App-form">
          <div className="App-field">
            <label className="App-label" htmlFor="url">Url</label>
            <input id="url" className="App-input" value={url} onChange={e => setUrl(e.target.value)} />
          </div>
          <div className="App-field">
            <label className="App-label" htmlFor="method">Method</label>
            <select id="method"  className="App-input" value={method} onChange={e => setMethod(e.target.value)}>
              {Object.values(RequestMethod).map(value => {
                return <option key={value} value={value}>{value}</option>;
              })}
            </select>
          </div>
          <div className="App-field">
            <label className="App-label" htmlFor="body">Body json</label>
            <input id="body" className="App-input" value={body} onChange={e => setBody(e.target.value)} />
          </div>
          <button className="App-button" onClick={sendApiRequest}>Send Request</button>
          <div className="App-field">
            <label className="App-label" htmlFor="result">Response</label>
            <textarea id="result" className="App-textarea" rows={20} cols={80} defaultValue={requestResponse} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
