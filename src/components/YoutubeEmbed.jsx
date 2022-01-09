import React from "react";
import PropTypes from "prop-types";
import './YoutubeEmbed.less';
const YoutubeEmbed = ({ embedId,height }) => (
    <div className="video-responsive">
        <iframe
            width="100%"
            height={height}
            src={`https://www.youtube.com/embed/${embedId}?playlist=${embedId}&loop=1&autoplay=1&controls=0&mute=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
        />
    </div>
);

YoutubeEmbed.propTypes = {
    embedId: PropTypes.string.isRequired
};
YoutubeEmbed.defaultProps = {
    height:600
}
export default YoutubeEmbed;
