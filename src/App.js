import React from 'react';
import Content from './components/Content';
import AppBar from './components/AppBar';

// TODO: remove this when Material UI will remove the old typography variants in the next major release v4.0.0 (Q1 2019)
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const App = () => (
  <div>
    <AppBar />
    <Content />
  </div>
);

export default App;
