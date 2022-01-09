import React from 'react';
import {Layout} from "antd";
import './Error.less';
const {Header,Content} = Layout;
export default function ErrorPage(){
    return(
        <Layout>
            <Header className='marvel-header'>
                <img className='marvel-header__logo' src='/assets/img/logo.png' />
            </Header>
            <Content style={{marginTop:120,textAlign:'center'}}>
                <div className='marvel-intro__overlay'>
                    <h1>404<span>NOT FOUND</span></h1>
                </div>
            </Content>
        </Layout>
    )
}
