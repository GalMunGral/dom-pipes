import Pipe from './lib/Pipe';
import { Text, Div, Image} from './lib/core';
import EnhancedInput from './EnhancedInput';
import { combineLatest } from 'rxjs';
import { map, switchMap, share } from 'rxjs/operators';

export default class App extends Pipe {
  constructor() {
    super('div', ['app', 'flex-column'], {
      div: new Div(['flex-centered'], {
        a: new EnhancedInput().style({
          'font-family': `'VT323', monospace`,
          'font-size': '30px'
        }),
        b: new Div(['wrapper'], {
          text: new Text().style({
            'margin': '0',
            'font-family': `'Lobster', cursive`,
            'font-size': '3rem',
            'font-weight': '900',
            'text-align': 'center'
          }),
          img: new Image().style({
            'margin': '20px 0 0',
            'width': '100%',
            'object-fit': 'contain'
          })
        })
      }).style({
        'height': '700px'
      })
    });
    this.plug();
  }

  plug() {
    const textInput = this.children.div.input.input;
    const textDisplay = this.children.div.output.text;
    const imageSrc = this.children.div.output.src;

    const json$ = textInput.pipe(
      switchMap(s => fetch('https://yesno.wtf/api')),
      switchMap(res => res.json()),
      share()
    );

    json$.pipe(
      map(json => json.image)
    ).subscribe(imageSrc);
    
    const truncatedInput = textInput.pipe(
      map(t => (t.length > 10 ? '...' : '')+ t.slice(-10))
    );

    combineLatest(truncatedInput, json$).pipe(
      map(([text, json]) => `${text} : ${json.answer.padEnd(3, ' ').replace(/\s/g,'&nbsp;')}`)
    ).subscribe(textDisplay);
  }
}