import * as React from 'react';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';

import { withConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Countdown from './Countdown';
import { valueType, FormatConfig, formatValue } from './utils';

interface NumberComponent {
  Countdown: typeof Countdown;
}

export type NumberProps = {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  value?: valueType;
  title?: string;
  unit?: string;
} & FormatConfig;

interface NumberState {}

class Number extends React.Component<NumberProps & ConfigConsumerProps, NumberState> {
  // static getDerivedStateFromProps(nextProps: NumberProps, prevState: NumberState) {

  // }

  getValue() {
    const { value = 0 } = this.props;
    return formatValue(value, this.props);
  }

  render() {
    const { prefixCls, className, style, title, unit } = this.props;
    return (
      <div className={classNames(prefixCls, className)} style={style}>
        <div aria-hidden="true" className={`${prefixCls}-title`}>
          {title}
        </div>
        <div aria-label={title} className={`${prefixCls}-value`}>
          {this.getValue()}
          {unit && <span className={`${prefixCls}-value-unit`}>{unit}</span>}
        </div>
      </div>
    );
  }
}

polyfill(Number);

const WrapperNumber = withConfigConsumer<NumberProps>({
  prefixCls: 'number',
})<NumberComponent>(Number);

export default WrapperNumber;
