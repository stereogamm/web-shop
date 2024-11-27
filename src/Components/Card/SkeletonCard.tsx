import React from "react";
import ContentLoader from "react-content-loader";

const SkeletonCard: React.FC = (props) => (
  <ContentLoader
    speed={3}
    width={380}
    height={760}
    viewBox="0 0 380 760"
    backgroundColor="#ededed"
    foregroundColor="#d3cfcf"
    {...props}
  >
    <rect x="90" y="358" rx="4" ry="8" width="275" height="46" />
    <rect x="90" y="431" rx="8" ry="8" width="275" height="91" />
    <rect x="90" y="6" rx="17" ry="20" width="275" height="313" />
    <rect x="219" y="536" rx="20" ry="20" width="145" height="46" />
    <rect x="96" y="545" rx="1" ry="10" width="70" height="32" />
  </ContentLoader>
);

export default SkeletonCard;
