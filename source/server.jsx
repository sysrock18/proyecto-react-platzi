import http from 'http';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import messages from './messages.json';

import Pages from './pages/containers/Page';
import Layout from './pages/components/Layout';

import store from './store';

const domain = process.env.NODE_ENV === 'production'
  ? 'https://simon-platzi-react-sfs.now.sh'
  : 'http://localhost:3001';

function requestHandler(request, response) {
  const locale = request.headers['accept-language'].indexOf('es') >= 0 ? 'es' : 'en';
  const context = {};

  const html = renderToString(
    <Provider store={store}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <StaticRouter location={request.url} context={context}>
          <Pages />
        </StaticRouter>
      </IntlProvider>
    </Provider>,
  );

  let title = '';
  if (request.url === '/') {
    title = 'Home';
  } else if (request.url.substring(0, 6) === '/post/') {
    title = 'Post';
  } else if (request.url.substring(0, 6) === '/user/') {
    title = 'User';
  } else {
    title = 'Not Found';
  }

  response.setHeader('Content-type', 'text/html');

  if (context.url) {
    response.writeHead(301, {
      Location: context.url,
    });
    response.end();
  }

  response.write(
    renderToStaticMarkup(
      <Layout
        title={title}
        content={html}
        domain={domain}
      />,
    ),
  );
  response.end();
}

const server = http.createServer(requestHandler);

server.listen(3000);
