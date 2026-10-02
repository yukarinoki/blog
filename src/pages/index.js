import React from "react"
import { Link } from "gatsby"
import DirectoryLayout from "../components/directory-layout"

const Index = () => (
  <DirectoryLayout title="Index" navigation={false}>
    <nav aria-label="Main navigation">
      <ul>
        <li><Link to="/blog/">Blog</Link></li>
        <li><Link to="/works/">Works</Link></li>
      </ul>
    </nav>
  </DirectoryLayout>
)

export default Index
