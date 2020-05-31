import React from 'react';
import '@/components/GeneralList.scss';

export default class GeneralList extends React.Component {
    generaltitle = (title) => {
        return <span className="General-title">{title || ''}</span>
    }
    generalitem = (list) => {
        return list.map((item, index) => {
            let [spuId,skuId] = [item.href.split('https://shop.vivo.com.cn/wap/product/')[1].split('?colorSkuid=')[0]|| '',item.href.split('https://shop.vivo.com.cn/wap/product/')[1].split('?colorSkuid=')[1] || ''];
            return <div className="General-box-item" onClick={()=>this.props.Click({spuId,skuId})} key={index}>
                <div className="General-box-item-img">
                    <img src={item.picSrc || item.imgUrl} alt="图片" />
                </div>
                <span className="General-box-item-title">
                    {item.name}
                </span>
                {
                    item.salePrice ? <div className="General-box-item-price">
                        <span className="old-price">¥{item.salePrice}</span>
                    </div> : ""
                }
            </div>
        })
    }
    render() {
        return <div className="General">
            {this.generaltitle(this.props.GeneralTitle)}
            <div className="General-box">
                {this.generalitem(this.props.List)}
            </div>
        </div>
    }
}