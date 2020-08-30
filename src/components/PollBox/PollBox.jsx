import React, { useRef, useState, useCallback, useEffect } from "react"
import PropTypes from "prop-types"
import cx from "classnames"
import useSWR from "swr"
import { a, useSpring } from "react-spring"
import gsap from "gsap"

import sty from "./PollBox.module.scss"

// import getResult from "../../api/AgorAPI/getResult.js"
import getP1P2Result from "../../api/backendless/getP1P2Result.js"
import votePollBL from "../../api/backendless/votePollBL.js"
import { setPollLocked, checkIsPollLocked } from "../../helper/getPollLocked.js"

// const votePoll = require("../../api/AgorAPI/votePoll.js")
// const votePollBL = require("../../api/backendless/votePollBL.js")

const PollBox = ({
  data: { poll_id, P1, P2 },
  isPollLocked,
  setIsPollLocked,
}) => {
  const refGoPoll = useRef(null)
  const { data, error, mutate } = useSWR(
    `https://api.open-agora.com/polls/${poll_id}`,
    (url) => getP1P2Result({ poll_id, P1_name: P1.name, P2_name: P2.name })
    // axios.get(url).then(({ data }) => {
    //   return data
    // })
  )

  console.log(data)

  useEffect(() => {
    if (!isPollLocked) {
      setTimeout(() => {
        gsap.to(refGoPoll.current, {
          duration: 1,
          ease: "bounce.in",
          y: -10,
          yoyo: true,
          repeat: -1,
          repeatDelay: 0.3,
        })
      }, 1000)
    }
    return () => {}
  }, [isPollLocked])

  // const [data, setData] = useState({
  //   P1: {
  //     percent: "40%",
  //   },
  //   P2: {
  //     percent: "60%",
  //   },
  // })

  const styleP1 = useSpring({
    height: data && isPollLocked ? data.P1.percent : "0%",
  })
  const styleP2 = useSpring({
    height: data && isPollLocked ? data.P2.percent : "0%",
  })

  const voteTheChoice = useCallback(
    (choice_name, Player) => {
      if (checkIsPollLocked(poll_id)) {
        alert("該場已投票過了喔！")
      } else {
        const newP1Score = data.P1.score + (Player === "P1" ? 1 : 0)
        const newP2Score = data.P2.score + (Player === "P2" ? 1 : 0)
        const allScore = newP1Score + newP2Score
        const P1Percent = allScore
          ? Math.round((newP1Score / allScore) * 100)
          : 0
        const P2Percent = allScore
          ? Math.round((newP2Score / allScore) * 100)
          : 0

        votePollBL({
          poll_id,
          choice_name,
        }).then(() => {
          mutate({
            P1: {
              id: data.P1.id,
              score: newP1Score,
              percent: `${P1Percent}%`,
            },
            P2: {
              id: data.P2.id,
              score: newP2Score,
              percent: `${P2Percent}%`,
            },
          })
        })

        // setTimeout(() => {

        // }, 1200)

        setPollLocked(poll_id)
        setIsPollLocked(true)
      }
    },
    [poll_id, isPollLocked, setIsPollLocked, data, mutate]
  )

  const voteToP1 = useCallback(() => {
    if (data) {
      console.log(data)
      voteTheChoice(data.P1.id, "P1")
    }
  }, [data, voteTheChoice])

  const voteToP2 = useCallback(() => {
    if (data) {
      voteTheChoice(data.P2.id, "P2")
    }
  }, [data, voteTheChoice])

  if (data) {
    return (
      <div className={sty.PollBox}>
        {!isPollLocked && <h1 ref={refGoPoll}>👇！點擊投票看結果！👇</h1>}
        <div className={cx("flex--center")}>
          <section
            className={cx("flex--col--AI_center", sty.section)}
            onClick={voteToP1}
          >
            <img src={P1.photo} alt="" />
            <a.div style={styleP1} className={cx(sty.box__percent)}>
              {data.P1.percent}
            </a.div>
            <h2>👆{P1.name}👆</h2>
          </section>

          <section
            className={cx("flex--col--AI_center", sty.section)}
            onClick={voteToP2}
          >
            <img src={P2.photo} alt="" />
            <a.div style={styleP2} className={cx(sty.box__percent)}>
              {data.P2.percent}
            </a.div>
            <h2>👆{P2.name}👆</h2>
          </section>
        </div>
      </div>
    )
  } else {
    return <div className={sty.box__loading}>Loading...</div>
  }
}

PollBox.propTypes = {}

export default PollBox
