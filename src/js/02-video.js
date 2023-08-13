import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const onPlay = event => {
  console.log(event);
  localStorage.setItem(
    'videoplayer-current-time',
    JSON.stringify(event.seconds)
  );
};

player.setCurrentTime(localStorage.getItem('videoplayer-current-time'));
player.on('timeupdate', throttle(onPlay, 1000));
