# dom-pipes
An idea for a rxjs-based front-end framework

Run `npm run dev`

```ts
interface ChildrenMap {
  [name: string]: Pipe
}

interface InputMap {
  [name: string]: Observable<any>
}

interface OutputMap {
  [name: string]: Subscriber<any>
}

class Pipe {
  protected element: HTMLElement;
  public children: ChildrenMap;
  public input: InputMap;
  public output: OutputMap;

  constructor(type: string, classes?: string[], children?: ChildrenMap) {
    this.element = document.createElement(type);
    if (classes && classes.length > 0) this.class(...classes);
    if (children) this.add(children);
  }

  class(...classes) {
    this.element.classList.add(...classes);
    return this;
  }

  style(styleMap: {[name: string]: string}) {
    for (let [name, value] of Object.entries(styleMap)) {
      this.element.style[name] = value;
    }
    return this;
  }

  add(childrenMap: ChildrenMap) {
    this.children = childrenMap;
    this.element.append(...Object.values(childrenMap).map((p) => p.element));
    return this;
  }

  mount(root: ChildNode) {
    root.replaceWith(this.element);
  }
}
```
