import React from 'react';
import { withRouter } from 'react-router-dom';
import { homeApi, checkLogin, rushBuy } from '@/api';
import GeneralList from '@/components/GeneralList';
import HybridTitle from '@/components/HybridTitle';
import { Carousel } from 'antd-mobile';
import Swiper from "swiper"
import "swiper/css/swiper.css"
import '@/view/home/home.scss';

class Home extends React.Component {
    homeRef = null //ref接点
    swiperBox = null // swiper接点
    state = {
        opcity: 0, //导航栏透明度
        ifSwiper: false, //轮播是否显示
        imgHeight: 176,
        data: {
            homeMetaVO: {
                homeBannerVOS:[],
                homeFloorVOS: [
                    {}
                ]
            }
        },
        vbuy: {
            actSkuInfoVos: [],
            timeVo: {}
        },
        hasFixed: true,
    }
    componentDidMount() {
        Promise.all([this._HomeApi()],[this._RushBuy()]).then(()=>{
            this.setState({
                ifSwiper: true
            })
            new Swiper('.mySwiper',{
                loop: false, // 循环模式选项     
                slidesPerView: 3,
                observer:true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents:true//修改swiper的父元素时，自动初始化swiper
            });
        })  
    }
    goGoods = (query) => {
        this.props.history.push({
            pathname: '/goodsdetails',
            state: query
        })
    }
    //多个模块的列表请求
    _HomeApi = () => {
        homeApi({t: new Date().getTime()}).then(res=>{
            let homeBannerVOS = res.data.homeMetaVO.homeBannerVOS.map(item=>{
                return item.bannerDetail.split('data-src="')[1].toString().split('"')[0]
            })
            this.setState({
                data: {
                    homeMetaVO: {
                        homeFloorVOS: res.data.homeMetaVO.homeFloorVOS,
                        homeBannerVOS
                    }
                }
            })
        })
        checkLogin()
    }
    //抢购
    _RushBuy = () => {
        rushBuy({t: new Date().getTime()}).then(res=>{
            this.setState({
                vbuy: {
                    actSkuInfoVos: res.data.actSkuInfoVos,
                    timeVo: res.data.timeVo
                }
            })
        }).catch(err=>{
            console.log(err)
        })
    }
    //滚动头部样式变化
    handleScroll = () => {
        let e = this.homeRef
        e.addEventListener('scroll', () => {
            (e.scrollTop>150) ? this.setState({
                opcity: 1
            }) : this.setState({
                opcity: e.scrollTop / 150
            })
        })   
    }
    //头部render
    titleRender = () => {
        return <HybridTitle
                className="index-scan"
                hasTitle={true}
                backgroundColor={`rgba(1,1,1,${this.state.opcity})`}
                titleHeight={60}
                title={<div className="index-scan-search">
                    <div className="iconfont icon-search"></div>
                    <span>iQOO Type-C胶囊闪充数据线-4A</span>
                </div>}
                right={
                    <div className="index-box">
                        <div className="index-scan-icon">
                            <div className="iconfont icon-cart"></div> 
                        </div>
                    </div>
                }
            />
    }
    //九宫格render
    entryRender = (list) => {
        return <div className="index-entry">
            {   list.homeFloorPosElementVOS ?
                list.homeFloorPosElementVOS.map((item,index)=>{
                    return <div className="index-entry-item" key={index}>
                    <img src={item.picSrc} alt="item"></img>
                </div>
                }) : ""
            }
		</div>
    }
    //抢购render
    vbuyRender = (vbuy) => {
        return <div className="index-vbuy">
            <div className="index-vbuy-tit">
                <div className="tit">
                    <span className="tit-txt">距离本场结束</span>
                    <span className="v-count-down">
                        <span>
                            <span>
                                <span className="tbg">03</span>
                                <em className="risk">:</em>
                                <span className="tbg">24</span>
                                <span>
                                    <em className="risk">:</em>
                                    <span className="tbg">32</span>
                                </span>
                            </span>
                        </span>
                    </span> 
                </div>
            </div>
            <div className="index-vbuy-list">
                <div className="swiper-container mySwiper" ref={e => this.swiperBox = e }>
                    <div className="swiper-wrapper">
                        {
                            vbuy.actSkuInfoVos.map((item,child)=>{
                                return <div className="swiper-slide item" key={`vbuy${child}`}>
                                    <div className="pic-box">
                                        <div className="pic">
                                            <img className="img" alt="pic" src={item.skuImg}/>
                                            <i className="corner" style={{backgroundImage : `url(${item.cornerImg})`}}></i>
                                        </div>
                                    </div>
                                    <div className="info">
                                        <div className="name">{item.skuName}</div>
                                        <div className="price">
                                            <strong>￥{item.actPrice}</strong>
                                            <span>￥{item.marketPrice}</span>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    }
    render() {
        return <div className="index" ref={home => this.homeRef = home} onScroll={this.handleScroll}>
            {this.titleRender()}
            <Carousel
            autoplay={false}
            infinite
            >
            {this.state.data.homeMetaVO.homeBannerVOS.map((val,valIndex) => (
                <a
                key={valIndex}
                href="http://www.alipay.com"
                style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                >
                <img
                    src={val}
                    alt=""
                    style={{ width: '100%', verticalAlign: 'top' }}
                    onLoad={() => {
                    window.dispatchEvent(new Event('resize'));
                    this.setState({ imgHeight: 'auto' });
                    }}
                />
                </a>
            ))}
            </Carousel>
            {
                this.entryRender(this.state.data.homeMetaVO.homeFloorVOS[0])
            }

            {
                this.vbuyRender(this.state.vbuy)
            }

            {
                this.state.data.homeMetaVO.homeFloorVOS.filter(i=>i.name).map((item,key)=>{
                    return <GeneralList GeneralTitle={item.name} List={item.homeFloorPosElementVOS}  key={key} Click={this.goGoods}/>
                })
            } 
        </div>
    }
}
export default withRouter(Home);