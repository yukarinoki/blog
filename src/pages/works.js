import React from "react"
import DirectoryLayout from "../components/directory-layout"

const Works = () => (
  <DirectoryLayout title="Works">
    <section className="work" aria-labelledby="flick-title">
      <h2 id="flick-title"><a href="/works/flick/">フリック日和</a></h2>
      <p>日本語フリック入力の練習アプリ。</p>
    </section>
  </DirectoryLayout>
)

export default Works
