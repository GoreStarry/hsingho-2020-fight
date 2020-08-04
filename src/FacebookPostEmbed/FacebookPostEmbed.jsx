import React, { useRef, useState, useCallback, useEffect } from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import cx from "classnames"

import sty from "./FacebookPostEmbed.module.scss"

const FacebookPostEmbed = ({ children, postUrl, width, className }) => {
  return (
    <div className={cx(sty.FacebookPostEmbed, className)}>
      <Helmet>
        <script
          async
          defer
          src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2"
        ></script>
      </Helmet>
      <div id="fb-root"></div>
      <div
        data-lazy="true"
        className="fb-post"
        data-href={postUrl}
        data-width="400"
      ></div>
      {children}
    </div>
  )
}

FacebookPostEmbed.propTypes = {
  postUrl: PropTypes.string,
  width: PropTypes.string,
}

export default FacebookPostEmbed
