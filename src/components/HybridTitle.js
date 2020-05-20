import React from 'react';
import PropTypes from 'prop-types';
import '@/components/HybridTitle.scss';
// 学到react插槽如何处理。通过props.children
// 状态栏显示 
// 头部自定义高度、自定义图标、标题slot插槽 、
export default class HybridTitle extends React.Component {
    static propTypes = {
        hasFixed: PropTypes.bool,
        titleHeight: PropTypes.number,
        leftIcon: PropTypes.array,
        opcity: PropTypes.number,
        contentTitle: PropTypes.string,
        rightIcon: PropTypes.array,
        left: PropTypes.element,
        title: PropTypes.element,
        right: PropTypes.element
    }
    //如果没有传值，可以给一个默认值
	static defaultProps = {
        hasFixed: true,
        titleHeight: 44,
        leftIcon: [],
        opcity: 1,
        contentTitle: '',
        rightIcon: []
    }
    componentDidMount() {
        
    }
    render() {
        return (
            <div className={`hybrid-title ${this.props.hasFixed ? 'hybrid-title-fixed' : ''}`}>
                <div className="hybrid-title-header" style={{height: this.props.titleHeight ,background: this.props.backgroundColor}} >
                    {
                        this.props.left
                    }
                    {
                        this.props.leftIcon.length ?
                            <div className="hybrid-title-header-btns">
                                {this.props.leftIcon.map((item,leftKey) => {
                                    return <div key={`left_${leftKey}`} onClick={()=>item.Click()}>
                                        <div className={`iconfont ${item.icon}`}></div>
                                    </div>
                                })}
                            </div> : ''
                    }
                    <div className="hybrid-title-header-container" style={{opcity: this.props.opcity}}>
                        {this.props.contentTitle}
                        {this.props.title}
                    </div>

                    {
                        this.props.rightIcon.length ?
                            <div className="hybrid-title-header-btns">
                                {
                                    this.props.rightIcon.map((item,rightKey) => {
                                        return <div key={`right_${rightKey}`} onClick={()=>item.Click()}>
                                            <div className={`iconfont ${item.icon}`}></div>
                                        </div>
                                    })
                                }

                            </div> : ''
                    }
                    {
                        this.props.right
                    }
                </div>
            </div>
        )
    }
}