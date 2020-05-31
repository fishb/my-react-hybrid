import React from 'react';
import { BrowserRouter , Route, HashRouter} from 'react-router-dom';
import Footer from '@/components/Footer';
// 页面
import Home from '@/view/home/home';
import Cart from '@/view/cart/cart';
import Mine from '@/view/mine/mine';
import Choose from '@/view/choose/choose';
import GoodsDetails from '@/view/goods/goodsdetails';
export default class RouterConfig extends React.Component{
    render() {
        return <HashRouter>
        <main className="route-box">
          <Route path="/" exact component={Home}/>
          <Route path="/cart" exact component={Cart}/>
          <Route path="/mine" exact component={Mine}/>
          <Route path="/choose" exact component={Choose}/>
          <Route path="/goodsdetails" exact component={GoodsDetails} />
        </main>
        <Footer />
      </HashRouter>
    }
}