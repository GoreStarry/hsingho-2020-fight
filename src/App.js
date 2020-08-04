import React from "react"
import { useEffect, useState, useRef } from "react"
import useSWR from "swr"
import axios from "axios"
import cx from "classnames"

import FacebookPostEmbed from "./FacebookPostEmbed"
import WormMan from "./components/svg/WormMan.jsx"
import LeMan from "./components/svg/LeMan.jsx"
import Title from "./components/svg/Title.jsx"
import H2 from "./components/svg/H2.jsx"

import "./App.css"
import "./global.scss"
import sty from "./App.module.scss"

const backendlessAPIUrl =
  "https://api.backendless.com/401F07F0-4899-A358-FFAA-5F19863E0900/325265EF-3C37-4014-B9A1-1D0603B7F2A9/data/XINGHO_2020_FIGHT?where=active%3Dtrue"

// const data = [
//   {
//     fb_poll_url:
//       "https://www.facebook.com/pxmartchannel/posts/3980394365364513",
//   },
// ]

function App() {
  const refData = useRef(null)

  const { data, error } = useSWR(backendlessAPIUrl, (url) =>
    axios.get(url).then(({ data }) => {
      return data
    })
  )

  useEffect(() => {
    if (
      data?.[0]?.fb_poll_url &&
      refData.current &&
      data[0]["fb_poll_url"] !== refData.current[0]["fb_poll_url"]
    ) {
      window.location.reload()
    }
    refData.current = data
    return () => {}
  }, [data])

  return (
    <main className={sty.App}>
      <Title className={sty.Title} />
      <H2 className={sty.H2} />
      <WormMan className={sty.WormMan} />
      <img className={sty.tree} src={require("./images/tree.svg")} alt="" />
      <div className={cx(sty.container_FB, "flex--center")}>
        {data && (
          <>
            <div className={sty.box__poll}>
              <a
                target="__blank"
                className={sty.link__cover}
                href={data[0]["fb_poll_url"]}
              ></a>
              <FacebookPostEmbed
                width="750"
                className={sty.FacebookPostEmbed}
                postUrl={data[0]["fb_poll_url"]}
              />
            </div>
            <div
              className="fb-page"
              data-href="https://www.facebook.com/hsinghoooh"
              // data-tabs="timeline"
              data-width=""
              data-height=""
              data-small-header="false"
              data-adapt-container-width="true"
              data-hide-cover="false"
              data-show-facepile="true"
            >
              <blockquote
                cite="https://www.facebook.com/hsinghoooh"
                className="fb-xfbml-parse-ignore"
              >
                <a href="https://www.facebook.com/hsinghoooh">
                  星合有限公司 &amp; 合作社 Hsingho Co., Ltd. &amp; HoooH
                </a>
              </blockquote>
            </div>
          </>
        )}
      </div>
      <LeMan className={sty.LeMan} />
    </main>
  )
}

export default App
