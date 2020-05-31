import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd-mobile'
import '@/components/HybridPopup.scss';

export default class HybridPopup extends React.Component {
    state = {
        bounce: 'none'
    }
    static propTypes = {
        show: [PropTypes.string, PropTypes.bool],
        type: PropTypes.string,
        boxWidth: [PropTypes.string, PropTypes.number],
        boxHeight: [PropTypes.string, PropTypes.number]
    }
    //如果没有传值，可以给一个默认值
    static defaultProps = {
        show: false,
        type: 'center',
        boxWidth: 'auto',
        boxHeight: 'auto'
    }
    changeShow() {
        this.setState({ bounce: 'hide' })
        setTimeout(() => {
            this.setState({
                bounce: 'none'
            })
        }, 200)
    }
    componentWillReceiveProps(props) {
        props.show ? this.setState({
            bounce: 'show'
        }) : this.props.type === 'bottom' ? this.changeShow() :
            this.setState({
                bounce: 'none'
            })
    }
    render() {
        return this.props.show ? <div className={`hybrid-popup ${this.state.bounce} ${this.props.type === 'center' ? 'popup-center' : 'popup-bottom'}`}>
            <div className="hybrid-popup-mask" onClick={() => { this.props.Popup() }}></div>
            <div className={`hybrid-popup-box ${this.props.type === 'bottom' ? 'pullup' : 'pullcenter'}`} style={{ width: this.props.boxWidth, height: this.props.boxHeight }}>
                {this.props.slot}
                {
                    this.props.type === 'bottom' ? <div className="close" onClick={() => { this.props.Popup() }}>
                        <Icon type="cross-circle" />
                    </div> :
                        <div className="closeMask" onClick={() => { this.props.Popup() }}>
                            <img src={require('@/assets/close.png')} alt="close" />
                        </div>
                }
            </div>
        </div> : ""
    }
}