import { ArtListItemContentProps } from '../sections/ArtListItem'
import art from '../../img/art'

export const artNames = [
  'tau',
  'wingedVictory',
  'prepboardBlack',
  'prepboardWhite',
  'thisConnected',
  'councilRoom',
  'keeney',
  'pillarsOfCreation',
  'split',
  'helloWorld',
  'architecture',
  'headspace',
  'karizmo',
  'nostalgia',
  'pixelRoom',
  'notFound',
  'scienceCarnival',
  'wired',
] as const
export type ArtName = typeof artNames[number]

const artContent: Record<ArtName, ArtListItemContentProps> = {
  tau: {
    artName: 'Tau',
    imgSrc: art.tauSrc,
  },
  prepboardBlack: {
    artName: 'Prepboard (Black)',
    imgSrc: art.prepboardBlackSrc,
  },
  prepboardWhite: {
    artName: 'Prepboard (White)',
    imgSrc: art.prepboardWhiteSrc,
  },
  thisConnected: {
    artName: 'This-Connected',
    imgSrc: art.thisConnectedSrc,
  },
  councilRoom: {
    artName: 'Council Room',
    imgSrc: art.councilRoomSrc,
  },
  keeney: {
    artName: 'Reflection',
    imgSrc: art.keeneySrc,
  },
  notFound: {
    artName: 'Not Found',
    imgSrc: art.notFoundSrc,
  },
  split: {
    artName: 'Split',
    imgSrc: art.splitSrc,
  },
  helloWorld: {
    artName: 'Hello World',
    imgSrc: art.helloWorldSrc,
  },
  architecture: {
    artName: 'A Bunch Of Buildings',
    imgSrc: art.architectureSrc,
  },
  headspace: {
    artName: 'Headspace',
    imgSrc: art.headspaceSrc,
  },
  karizmo: {
    artName: 'Prop Designs (Karizmo)',
    imgSrc: art.karizmoSrc,
  },
  nostalgia: {
    artName: 'Nostalgia',
    imgSrc: art.nostalgiaSrc,
  },
  pillarsOfCreation: {
    artName: 'Pillars',
    imgSrc: art.pillarsOfCreationSrc,
  },
  pixelRoom: {
    artName: 'Pixel Room',
    imgSrc: art.pixelRoomSrc,
  },
  scienceCarnival: {
    artName: 'Science Carnival 2017',
    imgSrc: art.scienceCarnivalSrc,
  },
  wingedVictory: {
    artName: 'Winged Victory',
    imgSrc: art.wingedVictorySrc,
  },
  wired: {
    artName: 'Wired',
    imgSrc: art.wiredSrc,
  },
}

export default artContent
