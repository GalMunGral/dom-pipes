import Pipe, { ChildrenMap } from '../Pipe';

export default class Div extends Pipe {
  constructor(classes: string[], children: ChildrenMap) {
    super('pipe', classes, children);
  }

  get input() {
    return Object.assign(
      {},
      ...Object.values(this.children).map(c => {
        return c.input;
      })
    )
  }

  get output() {
    return Object.assign(
      {},
      ...Object.values(this.children).map(c => {
        return c.output;
      })
    )
  }
}
