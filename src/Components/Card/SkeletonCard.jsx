import React from "react";
import ContentLoader from "react-content-loader";

const SkeletonCard = (props) => (
  <ContentLoader
    speed={3}
    width={400}
    height={466}
    viewBox="0 0 480 466"
    backgroundColor="#ededed"
    foregroundColor="#d3cfcf"
    {...props}
  >
    <rect x="67" y="299" rx="8" ry="8" width="302" height="26" />
    <rect x="68" y="339" rx="8" ry="8" width="302" height="65" />
    <rect x="66" y="6" rx="17" ry="17" width="302" height="280" />
    <rect x="254" y="418" rx="20" ry="20" width="114" height="38" />
    <rect x="67" y="423" rx="3" ry="3" width="94" height="32" />
  </ContentLoader>
);

export default SkeletonCard;
