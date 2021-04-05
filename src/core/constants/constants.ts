import Selection, { HandSize } from '../models/selection';

export const HAND_SIZE: HandSize[] = [
  { key: '1458', text: '14.5 8mm', value: 8, radiusWidth: 180, beadSize: 54, crystalCount: 21 },
  { key: '14510', text: '14.5 10mm', value: 10, radiusWidth: 180, beadSize: 66, crystalCount: 17 },
  { key: '168', text: '16 8mm', value: 8, radiusWidth: 180, beadSize: 47, crystalCount: 24 },
  { key: '1610', text: '16 10mm', value: 10, radiusWidth: 180, beadSize: 60, crystalCount: 19 },
  { key: '178', text: '17 8mm', value: 8, radiusWidth: 180, beadSize: 44, crystalCount: 26 },
  { key: '1710', text: '17 10mm', value: 10, radiusWidth: 180, beadSize: 57, crystalCount: 20 },
];

export const CRYSTAL_TYPE: Selection[] = [
  {
    key: '9951889',
    url: `${process.env.PUBLIC_URL}/assets/S__9551889-removebg-preview.png`,
  },
  {
    key: '9951890',
    url: `${process.env.PUBLIC_URL}/assets/S__9551890-removebg-preview.png`,
  },
  {
    key: '9951891',
    url: `${process.env.PUBLIC_URL}/assets/S__9551891-removebg-preview.png`,
  },
  {
    key: '9951892',
    url: `${process.env.PUBLIC_URL}/assets/S__9551892-removebg-preview.png`,
  },
  {
    key: '9951893',
    url: `${process.env.PUBLIC_URL}/assets/S__9551893-removebg-preview.png`,
  },
  {
    key: '9951894',
    url: `${process.env.PUBLIC_URL}/assets/S__9551894-removebg-preview.png`,
  },
  {
    key: '9951895',
    url: `${process.env.PUBLIC_URL}/assets/S__9551895-removebg-preview.png`,
  },
  {
    key: '9951896',
    url: `${process.env.PUBLIC_URL}/assets/S__9551896-removebg-preview.png`,
  },
  {
    key: '9951898',
    url: `${process.env.PUBLIC_URL}/assets/S__9551898-removebg-preview.png`,
  },
  {
    key: '9951899',
    url: `${process.env.PUBLIC_URL}/assets/S__9551899-removebg-preview.png`,
  },
  {
    key: '9951900',
    url: `${process.env.PUBLIC_URL}/assets/S__9551900-removebg-preview.png`,
  },
];

export const EIGHT_MM_SLIVER_PIPE: Selection[] = [
  {
    key: 'SLIVER_PIPE_NONE',
    text: 'NONE',
    value: 0,
  },
  {
    key: 'SLIVER_PIPE_8MM_1',
    text: 'SLIVER1',
    value: 2,
  },
  {
    key: 'SLIVER_PIPE_8MM_2',
    text: 'SLIVER2',
    value: 3,
  },
  {
    key: 'SLIVER_PIPE_8MM_3',
    text: 'SLIVER2',
    value: 4,
  },
  {
    key: 'SLIVER_PIPE_8MM_4',
    text: 'SLIVER2',
    value: 5,
  },
  {
    key: 'SLIVER_PIPE_8MM_5',
    text: 'SLIVER2',
    value: 5,
  },
];

export const TEN_MM_SLIVER_PIPE: Selection[] = [
  {
    key: 'SLIVER_PIPE_NONE',
    text: 'NONE',
    value: 0,
  },
  {
    key: 'SLIVER_PIPE_10MM_1',
    text: 'SLIVER1',
    value: 2,
  },
  {
    key: 'SLIVER_PIPE_10MM_2',
    text: 'SLIVER2',
    value: 2,
  },
  {
    key: 'SLIVER_PIPE_10MM_3',
    text: 'SLIVER2',
    value: 3,
  },
  {
    key: 'SLIVER_PIPE_10MM_4',
    text: 'SLIVER2',
    value: 3,
  },
  {
    key: 'SLIVER_PIPE_10MM_5',
    text: 'SLIVER2',
    value: 4,
  },
];

export const FLOWER_OPTION: Selection[] = [
  {
    key: 'FLOWER_OPTION_NONE',
    text: 'None',
  },
  {
    key: 'FLOWER_OPTION_LEFT',
    text: 'Add Left',
  },
  {
    key: 'FLOWER_OPTION_RIGHT',
    text: 'Add Right',
  },
];
