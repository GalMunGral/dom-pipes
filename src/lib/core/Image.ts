import Pipe, { ChildrenMap } from '../Pipe';
import { Subscriber } from 'rxjs';

export default class Image extends Pipe {
  constructor(src?: string, classes?: string[], children?: ChildrenMap) {
    super('img', classes, children);
    if (src) (this.element as HTMLImageElement).src = src;
  }

  get output() {
    return {
      src: new Subscriber((newSrc: string) => {
        (this.element as HTMLImageElement).src = newSrc;
      })
    }
  }
}
