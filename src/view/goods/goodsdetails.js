import React from 'react';
import HybridTitle from '@/components/HybridTitle';
// import GeneralList from '@/components/GeneralList';
import HybridPopup from '@/components/HybridPopup';
import { Carousel, Radio, List } from 'antd-mobile';
import '@/view/goods/goodsdetails.scss';
import { getDetail } from '@/api';

const RadioItem = Radio.RadioItem;
export default class GoodsDetails extends React.Component {
    constructor(props) {
        super(props)
        this.detailsRef = null;
        this.state = {
            type: '',
            hasStatus: true,
            titleHeight: 44,
            colorOpacity: 0,
            titleTab: ['商品', '评价', '详情', '推荐'],
            tabIndex: 0,
            imgList: ['https://shopstatic.vivo.com.cn/vivoshop/commodity/24/10001524_1584199444551_750x750.png.webp', 'https://shopstatic.vivo.com.cn/vivoshop/commodity/24/10001524_1584199444268_750x750.png.webp', 'https://shopstatic.vivo.com.cn/vivoshop/commodity/24/10001524_1584199443588_750x750.png.webp', 'https://shopstatic.vivo.com.cn/vivoshop/commodity/24/10001524_1584199443853_750x750.png.webp'],
            listbox: {
                name: '为你推荐',
                list: [{
                    imgUrl: "https://shopstatic.vivo.com.cn/vivoshop/commodity/59/10001559_1571643866653_250x250.png",
                    name: "iQOO Neo 855版 6GB+64GB 电光紫 ",
                    salePrice: 1998,
                    marketPrice: 1998,
                    url: "/product/10001559?skuId=102225",
                    traceId: "manual",
                    reqId: null,
                    testId: null,
                    testPlanId: null,
                    abId: "null|null|null",
                    recallSource: "1",
                    id: 102225
                }, {
                    imgUrl: "https://shopstatic.vivo.com.cn/vivoshop/commodity/72/10001072_1560500539596_250x250.png",
                    name: "vivo Z5x 6GB+64GB 极光色",
                    salePrice: 1298,
                    marketPrice: 1298,
                    url: "/product/10001072?skuId=101406",
                    traceId: "manual",
                    reqId: null,
                    testId: null,
                    testPlanId: null,
                    abId: "null|null|null",
                    recallSource: "1",
                    id: 101406
                }]
            }
        }
    }
    _getDetail = () => {
        getDetail().then(res => {
            this.setState({
                result: res.data || {}
            })
        })
    }
    changeTab = (index) => {
        if (this.state.tableIndex === index) return
        this.setState({
            tabIndex: index
        })
    }
    componentDidMount() {
        this._getDetail()
    }
    // 头部
    titleRender = () => {
        return <HybridTitle
            className="detail-title"
            hasTitle={true}
            hasStatus={this.state.hasStatus}
            backgroundColor={`rgba(1,1,1,${this.state.colorOpacity})`}
            titleHeight={this.state.titleHeight}
            leftIcon={[{ icon: 'icon-back', Click: () => this.props.history.goBack() }]}
            rightIcon={[{ icon: 'icon-favorate', Click: () => alert('收藏成功！') }]}
            title={this.state.colorOpacity ? <div className="detail-title-container">
                {
                    this.state.titleTab.map((item, index) => {
                        return <div className={['detail-title-container-item', this.state.tabIndex === index ? 'active' : ''].join(' ')} onClick={() => this.changeTab(index)} key={`title_${index}`}>
                            {item}
                        </div>
                    })
                }
            </div> : null}
        />
    }
    //滚动头部样式变化
    handleScroll = () => {
        let e = this.detailsRef
        e.addEventListener('scroll', () => {
            (e.scrollTop > 150) ? this.setState({
                colorOpacity: 1
            }) : this.setState({
                colorOpacity: e.scrollTop / 150
            })
        })
    }
    changeType = (show) => {
        this.setState({
            type: show
        })
    }
    //弹出层
    popup = (typeShow, slot) => {
        return <HybridPopup boxWidth="100%" boxHeight="auto" type="bottom" Popup={() => { this.setState({ type: '' }) }} show={this.state.type === typeShow} slot={slot} />
    }
    //商品图片
    detailRender = () => {
        return <Carousel
            autoplay={false}
            infinite
        >
            {this.state.imgList.map((val, valIndex) => (
                <a
                    key={valIndex}
                    href="http://www.alipay.com"
                    style={{ display: 'inline-block', width: '100%' }}
                >
                    <img
                        src={val}
                        alt=""
                        style={{ width: '100%', verticalAlign: 'top' }}
                        className="goodsdetails_img"
                    />
                </a>
            ))}
        </Carousel>
    }
    //优惠
    specsRender = () => {
        return <div className="detail-specs">
            <div className="detail-specs-item big" onClick={() => this.changeType('Coupon')}>
                <span>优惠</span>
                <div className="specs-item-box">
                    <span className="yh">[买2件]至少可优惠<span>¥5</span></span>
                    <div className="yh-box">
                        <div className="yh-box-item"><span>满299减30</span></div>
                        <div className="yh-box-item"><span>满299减30</span></div>
                        <div className="yh-box-item"><span>满299减30</span></div>
                    </div>
                </div>
                <span className="iconfont icon-jyh-right"></span>
            </div>
            <div className="detail-specs-item big" onClick={() => this.changeType('address')}>
                <span>配送</span>
                <div className="specs-item-box">
                    <span className="title">全国多仓就近发货 至 江西省南昌市青山湖区...</span>
                    <span className="label">免运费</span>
                </div>
                <span className="iconfont icon-jyh-right"></span>
            </div>
            <div className="detail-specs-item">
                <span>选择</span>
                <div className="specs-item-box">
                    <span className="title">尺码 , 颜色</span>
                </div>
                <span className="iconfont icon-jyh-right"></span>
            </div>
            <div className="detail-specs-item">
                <span>服务</span>
                <div className="specs-item-box">
                    <span className="title">破损包赔.无忧质保...</span>
                </div>
                <span className="iconfont icon-jyh-right"></span>
            </div>
        </div>
    }
    // 底部
    footerRender = () => {
        return <div className="detail-control">
            <div className="detail-control-flex">
                <div className="detail-control-flex-item">
                    <img src={require('@/assets/cart.png')} alt="i" />
                    <span>购物车</span>
                </div>
                <div className="detail-control-flex-item">
                    <img src={require('@/assets/msg.png')} alt="j" />
                    <span>客服</span>
                </div>
            </div>
            <div className="detail-control-right">
                <button className="detail-control-right-button default">加入购物车</button>
                <button className="detail-control-right-button success">立即购买</button>
            </div>
        </div>
    }
    render() {
        return <div className="wrap detail" ref={details => this.detailsRef = details} onScroll={this.handleScroll}>
            {this.titleRender()}
            <div className="media" id="media">
                {this.detailRender()}
            </div>
            <div className="detail-info">
                <div className="detail-info-price">
                    <strong className="normal">
                        <span className="yen">¥</span>999
                        </strong>
                    <span className="normal line-through">
                        <span className="yen">¥</span>1098
                        </span>
                </div>
                <span className="detail-info-title">vivo U3x 6GB+64GB 深湖蓝 </span>
                <p className="detail-info-sale">
                    <span className="sale-point">[赠组合配件券]</span>
                        5000mAh大电池，18W双引擎闪充，骁龙665八核处理器。</p>
            </div>
            {this.specsRender()}
            {/* {
                <GeneralList GeneralTitle={this.state.listbox.name} List={this.state.listbox.list}/>
            }  */}
            {this.footerRender()}

            {
                this.popup('Coupon', <div className="yhj">
                    <div className="yhj-title">优惠券</div>
                    <div className="yhj-content">
                        <span className="title">可领店铺券</span>
                        <div className="list">
                            <div className="list-item">
                                <div className="list-item-face">
                                    <span className="facevalue">20<span>元</span></span>
                                    <span className="faceway">满188使用</span>
                                </div>
                                <div className="line"></div>
                                <div className="list-item-right">
                                    <div className="item-flex">
                                        <span className="flex-title">蓝帽子滋补保健专营店</span>
                                        <span>2019.05.31.23:59过期</span>
                                    </div>
                                    <button>立即领取</button>
                                </div>
                            </div>
                            <div className="list-item">
                                <div className="list-item-face">
                                    <span className="facevalue">20<span>元</span></span>
                                    <span className="faceway">满188使用</span>
                                </div>
                                <div className="line"></div>
                                <div className="list-item-right">
                                    <div className="item-flex">
                                        <span className="flex-title">蓝帽子滋补保健专营店</span>
                                        <span>2019.05.31.23:59过期</span>
                                    </div>
                                    <button>立即领取</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)
            }

            {
                this.popup('address', <div className="address">
                    <div className="address-title">配送信息</div>
                    <List className="address-list">
                        <RadioItem className="list-item">
                            <span className="iconfont icon-dingwei"></span>
                            <span className="map">江西省南昌市西湖区水利厅...</span>
                        </RadioItem>
                        <RadioItem className="list-item">
                            <span className="iconfont icon-dingwei"></span>
                            <span className="map">江西省南昌市西湖区水利厅 402室</span>
                        </RadioItem>
                    </List>
                </div>)
            }
        </div>
    }
}