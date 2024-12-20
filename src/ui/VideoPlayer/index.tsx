import { FC } from 'react';

import YouTube, { YouTubeProps } from 'react-youtube';

import './style.scss';

export const VideoPlayer: FC<{ id: string }> = ({ id }) => {
	const opts: YouTubeProps['opts'] = {
		playerVars: {
			autoplay: 1
		}
	};

	const props: YouTubeProps = {
		videoId: id,
		opts,
		className: 'video-player'
	};

	return <YouTube {...props} />;
};
