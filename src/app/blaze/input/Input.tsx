import { h, Component, prop, emit } from 'skatejs';
import styles from './Input.scss';
import { css } from '../../ui-fabric/utils/css';

const InputColors = {
  success: 'success',
  error: 'error'
};

const InputSizes = {
  xsmall: 'xsmall',
  small: 'small',
  medium: 'medium',
  large: 'large',
  xlarge: 'xlarge',
  'super': 'super' // super is reserved word!!!
};

type InputColorsType = typeof InputColors;
type InputSizesType = typeof InputSizes;

//public
interface InputProps extends JSX.HTMLProps<Input> {
  value: string,
  color?: keyof InputColorsType,
  placeholder?: string,
  disabled?: boolean,
  size?: keyof InputSizesType,
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
      disabled: prop.boolean(),
      size: prop.string(),
    }
  }

  color = '';
  value = '';
  size: string;
  placeholder: string;
  disabled: boolean;

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
    const { color, value, placeholder, disabled, size } = this;
    const className = css(
      'c-field',
      {
        'c-field--success': color === InputColors.success,
        'c-field--error': color === InputColors.error,
        'u-xsmall': size === InputSizes.xsmall,
        'u-small': size === InputSizes.small,
        'u-medium': size === InputSizes.medium,
        'u-large': size === InputSizes.large,
        'u-xlarge': size === InputSizes.xlarge,
        'u-super': size === InputSizes.super
      }
    );


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