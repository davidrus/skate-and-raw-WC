import { h, Component, prop, emit } from 'skatejs';
import styles from './Input.scss';
import { css } from '../../ui-fabric/utils/css';

const InputColors = {
  success: 'success',
  error: 'error'
};

type InputColorsType = typeof InputColors;

//public
interface InputProps extends JSX.HTMLProps<Input> {
  value: string,
  color?: keyof InputColorsType,
  placeholder?: string,
  disabled?: string,
}

export class Input extends Component {
  _props: InputProps;
  static get is() { return 'bl-input' }
  static get props() {
    return {
      value: prop.string({
        attribute: true
      }),
      color: prop.string(),
      placeholder: prop.string(),
      disabled: prop.string(),
    }
  }

  color = '';
  value = '';
  placeholder: string;
  disabled: string;

  inputElement: HTMLInputElement;

  private provideValue(event: Event) {
    this.value = this.inputElement.value;
    emit(this,'change'); // emit change event on root element
  }

  connectedCallback(){
    super.connectedCallback();
    this.provideValue = this.provideValue.bind(this);
  }

  renderCallback() {
    const { color, value, placeholder, disabled } = this;
    const className = css(
      'c-field',
      {
        'c-field--success': color === InputColors.success,
        'c-field--error': color === InputColors.error
      }
    );
    const isDisabled = disabled === 'disabled' ? true : false;

    return [
      <style>{styles}</style>,
      <input
        ref={(_ref: HTMLInputElement)=>this.inputElement=_ref}
        className={className}
        type="text"
        value={value}
        onChange={this.provideValue}
        placeholder={placeholder}
        disabled={disabled}
      />
    ]
  }
}

customElements.define( Input.is, Input );