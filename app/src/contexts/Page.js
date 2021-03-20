import { node, string } from 'prop-types';
import React, { createContext, useContext, useEffect, useState } from 'react';

import Navbar from '../containers/Navbar';

export const PageContext = createContext();

const Page = ({ nextUrl, children }) => {
  const [url, setUrl] = useState();

  useEffect(() => {
    if (url !== nextUrl) setUrl(nextUrl);
  }, [url, setUrl, nextUrl]);

  return (
    <PageContext.Provider value={{ url }}>{children}</PageContext.Provider>
  );
};

Page.propTypes = {
  nextUrl: string,
  children: node,
};

export const withPage = (nextUrl) => (Wrapper) => (props) => (
  <Page nextUrl={nextUrl}>
    <>
      <Navbar />
      <Wrapper {...props} />
    </>
  </Page>
);

export const usePageContext = () => useContext(PageContext);

export default Page;
