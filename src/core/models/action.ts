export default class Action<T = any> {
  type!: string;
  data!: T;
}
