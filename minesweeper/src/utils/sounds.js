import { Howl } from 'howler';
import click from '../assets/sounds/button-click.mp3';
import winSound from '../assets/sounds/victory.mp3';
import loseSound from '../assets/sounds/burst.mp3';

export const clickSound = () => {
  new Howl({
    src: [click]
  }).play();
}

export const playWinSound = () => {
  new Howl({
    src: [winSound]
  }).play();
}

export const playLoseSound = () => {
  new Howl({
    src: [loseSound]
  }).play();
}
