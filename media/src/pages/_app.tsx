import type { AppProps } from "next/app";
import "./document/index.scss";
import "../styles/globals.css";
import "../main.css"
import "@alicloud/console-components/dist/wind.css";
import React from "react";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
