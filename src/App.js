import React from "react"
import { useEffect, useState, useRef } from "react"
import useSWR from "swr"
import axios from "axios"
import cx from "classnames"
import { Helmet } from "react-helmet"

// import FacebookPostEmbed from "./FacebookPostEmbed"
import WormMan from "./components/svg/WormMan.jsx"
import PollBox from "./components/PollBox/index.js"
import LeMan from "./components/svg/LeMan.jsx"
import Title from "./components/svg/Title.jsx"
import H2 from "./components/svg/H2.jsx"

import { checkIsPollLocked } from "./helper/getPollLocked.js"

import "./App.css"
import "./global.scss"
import sty from "./App.module.scss"

const getActiveVSList = require("./api/backendless/getActiveVSList.js")
const backendlessAPIUrl =
  "https://api.backendless.com/401F07F0-4899-A358-FFAA-5F19863E0900/325265EF-3C37-4014-B9A1-1D0603B7F2A9/data/XINGHO_2020_FIGHT?where=active%3Dtrue"

// const data = [
//   {
//     poll_id:
//       "https://www.facebook.com/pxmartchannel/posts/3980394365364513",
//   },
// ]

function App() {
  const [isRenderPage, setIsRenderPage] = useState(false)
  const [isPollLocked, setIsPollLocked] = useState(false)
  // const refData = useRef(null)
  const refGoPoll = useRef(null)

  const { data, error } = useSWR(
    "https://api.backendless.com/",
    (url) => getActiveVSList()
    // axios.get(url).then(({ data }) => {
    //   return data
    // })
  )

  useEffect(() => {
    setIsRenderPage(true)
    return () => {}
  }, [])

  useEffect(() => {
    if (data) {
      data[0] && setIsPollLocked(checkIsPollLocked(data[0].poll_id))
    }
    return () => {}
  }, [data])

  return (
    <main className={sty.App}>
      <Helmet>
        <script
          async
          defer
          src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2"
        ></script>
      </Helmet>
      <Title className={sty.Title} />
      <H2 className={sty.H2} />
      <WormMan className={sty.WormMan} />
      <img className={sty.tree} src={require("./images/tree.svg")} alt="" />
      <div id="fb-root"></div>
      <div className={cx(sty.container_FB, "flex--center")}>
        {data && isRenderPage && (
          <div className={sty.box__poll}>
            {data && data[0] ? (
              <PollBox
                data={data[0]}
                isPollLocked={isPollLocked}
                setIsPollLocked={setIsPollLocked}
              />
            ) : (
              "場次轉換中..."
            )}
          </div>
        )}
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
      </div>
      <LeMan className={sty.LeMan} />
    </main>
  )
}

export default App
