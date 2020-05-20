import React from 'react';
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false,
      fullScreen: false,
      tab: '/',
      PrimaryRoute: ['/','/cart','/mine','/choose']
    };
  }
  _handlePressTab = (route) => {
    this.setState({
      tab: route
    })
    this.props.history.push(route)
  }
  render() {
    if(this.state.PrimaryRoute.includes(this.props.location.pathname)){
      return (
        <TabBar
          unselectedTintColor="#999"
          tintColor="#2c2c2c"
          barTintColor="white"
          hidden={this.state.hidden}
          noRenderContent={true}
        >
          <TabBar.Item
            title="首页"
            key="home"
            icon={<img src={require('@/assets/icon/index_off.png')} alt="首页" width="22" height="22"/>}
            selectedIcon={<img src={require('@/assets/icon/index_on.png')} alt="首页" width="22" height="22"/>}
            selected={this.state.tab === '/'}
            onPress={this._handlePressTab.bind(null, '/')}
            data-seed="logId"
          >
          </TabBar.Item>
          <TabBar.Item
            title="选购"
            key="choose"
            icon={<img src={require('@/assets/icon/sort_off.png')} alt="选购" width="22" height="22"/>}
            selectedIcon={<img src={require('@/assets/icon/sort_on.png')} alt="选购" width="22" height="22"/>}
            selected={this.state.tab === '/choose'}
            onPress={this._handlePressTab.bind(null, '/choose')}
            data-seed="logId"
          >
          </TabBar.Item>
          <TabBar.Item
            icon={<img src={require('@/assets/icon/cart_off.png')} alt="购物车" width="22" height="22"/>}
            selectedIcon={<img src={require('@/assets/icon/cart_on.png')} alt="购物车" width="22" height="22"/>}
            title="购物车"
            key="cart"
            selected={this.state.tab === '/cart'}
            onPress={this._handlePressTab.bind(null, '/cart')}
            data-seed="logId1"
          >
          </TabBar.Item>
          <TabBar.Item
            icon={<img src={require('@/assets/icon/mine_off.png')} alt="我的" width="22" height="22"/>}
            selectedIcon={<img src={require('@/assets/icon/mine_on.png')} alt="我的" width="22" height="22"/>}
            title="我的"
            key="tribune"
            selected={this.state.tab === '/mine'}
            onPress={this._handlePressTab.bind(null, '/mine')}
          >
          </TabBar.Item>
        </TabBar>
        )
    }
    return ''
  }
}

export default withRouter(Footer);