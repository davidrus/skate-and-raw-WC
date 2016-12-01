import { h, Component } from 'skatejs';
import styles from './Demo.scss';
import { Input } from '../Input';

export class Demo extends Component {
  static get is() { return 'demo-bl-input' }

  renderCallback() {
    return [
      <style>{styles}</style>,
      <div>
        <Input color="error" value="error state"
               placeholder="placeholder"
               onChange={() => { console.log("onChange")}}
        ></Input>
        <Input color="success" value="success state"
               onChange={() => { console.log("onChange")}}
        ></Input>
        <Input value="default state"
               onChange={() => { console.log("onChange")}}
        ></Input>
        <Input value="disabled state" disabled="disabled"></Input>
      </div>
    ]
  }
}

customElements.define( Demo.is, Demo );