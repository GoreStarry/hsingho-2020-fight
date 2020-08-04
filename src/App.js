import React from "react"
import { useEffect, useState, useRef } from "react"
import useSWR from "swr"
import axios from "axios"
import cx from "classnames"
import { Helmet } from "react-helmet"

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
  const [isRenderPage, setIsRenderPage] = useState(false)
  const refData = useRef(null)

  const { data, error } = useSWR(backendlessAPIUrl, (url) =>
    axios.get(url).then(({ data }) => {
      return data
    })
  )

  useEffect(() => {
    setTimeout(() => {
      setIsRenderPage(true)
    }, 1000)
    return () => {}
  }, [])

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
      <Helmet>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta charSet="utf-8" />
        <title>釘孤枝熱血大亂鬥</title>
        {/* <meta property="og:image" content={require("./images/og-image.jpg")} />
        <meta property="og:image:width" content="1146" />
        <meta property="og:image:height" content="600" />
        <meta property="og:title" content={allTitle} />
        <meta
          property="og:url"
          content={`https://2019.tedxtaipei.org/now/${url}`}
        />
        <meta
          property="og:description"
          content="一場轟炸式的腦力激盪，舞台上下串連好點子，一天15位來自不同領域的講者，探索人、想法、行動緊扣的凝聚變化，延伸活動連續3年邀集參與者共同支持反食物浪費、反一次性使用，從單一個體到群體的合作嘗試解決看見的問..."
        />
         */}
      </Helmet>
      <Title className={sty.Title} />
      <H2 className={sty.H2} />
      <WormMan className={sty.WormMan} />
      <img className={sty.tree} src={require("./images/tree.svg")} alt="" />
      {/* {data && (
        <FacebookPostEmbed
          className={sty.FacebookPostEmbed}
          postUrl={data[0]["fb_poll_url"]}
        />
      )} */}
      <div className={cx(sty.container_FB, "flex--center")}>
        {data && isRenderPage && (
          <>
            <div className={sty.box__poll}>
              <a
                target="__blank"
                className={sty.link__cover}
                href={data[0]["fb_poll_url"]}
              >
                <span>投票去！</span>
              </a>
              <FacebookPostEmbed
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
