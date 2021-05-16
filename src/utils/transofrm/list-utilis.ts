import { v4 as uuidv4 } from 'uuid';

export default function fillUUIDToArray(length: number) {
  return new Array(length).fill('').map(() => uuidv4());
}
