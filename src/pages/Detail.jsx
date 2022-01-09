import React, {useEffect, useState} from 'react';
import {Layout,Row,Col} from "antd";
import YoutubeEmbed from "../components/YoutubeEmbed";
import './Detail.less';
import axios from "axios";
import {CHARACTER, PUBLIC_KEY} from "../../config/Common";
import styled from "styled-components";
import Carousel from "@jjunyjjuny/react-carousel";
import {useParams} from "react-router-dom";
const {Header,Content} = Layout;
export default function Detail(){
const {id} = useParams();
const Container = styled.div`
  margin: 0 auto;
  margin-top: 100px;
`;
 const Item = styled.div`
  background: #dbe4ff;
  text-align: center;
  font-size: 2rem;
  line-height: 145px;
  //height: 150px;
  border-radius: 10px;
`;
    const [data,setData] = useState(null);
    const [comics,setComics] = useState(null);
    useEffect(()=>{
        getCharacter(id).then(res=>{
           setData(res);
        });
        getComics(id).then(res=>{
            setComics(res);
        });
    },[]);
    const getCharacter = async(characterId) => {
        const params = {
            apikey:PUBLIC_KEY
        }
        return new Promise((resolve,reject)=>{
            axios.get(CHARACTER+`/${characterId}`,{params}).then(({status,data}) => {
                if (status ===200){
                    resolve(data);
                }
            }).catch(err => reject(err));
        })
    }
    const getComics = async(characterId) => {
        const params = {
            apikey:PUBLIC_KEY,
            limit:10
        }
        return new Promise((resolve,reject)=>{
            axios.get(CHARACTER+`/${characterId}/comics`,{params}).then(({status,data}) => {
                if (status ===200){
                    resolve(data);
                }
            }).catch(err => reject(err));
        })
    }
    return(
        <Layout>
            <Header className='marvel-header'>
                <img className='marvel-header__logo' src='/assets/img/logo.png' />
            </Header>
            <Content className='marvel-intro'>
                <div className='marvel-intro__overlay'>
                    <h1>MARVEL<span>CHARACTERS</span></h1>
                </div>
                <YoutubeEmbed embedId="2SkMUjilx_M" />
            </Content>
            <Content>
                <div className='character-content container'>
                    {data && (<Row justify='center'>
                        <Col sm={{span: 24}} md={{span: 8}}>
                            <img
                                className='img-fluid'
                                src={data.data.results[0].thumbnail.path + "." + data.data.results[0].thumbnail.extension}/>
                        </Col>
                        <Col sm={{span: 24}} md={{span: 16}}>
                            <div className='text-container'>
                                <h1 className='section-title'>{data.data.results[0].name}</h1>
                                <p>{data.data.results[0].description}</p>
                            </div>

                        </Col>
                    </Row>)}
                </div>
            </Content>
            <Container>

                <h1 className='secondary-title'>Comics</h1>
                {comics && (<Carousel
                    itemCountPerPanel={5}
                    gap="16px"
                >
                    {comics.data.results.map((el) => (
                        <Item><img
                            style={{height:"auto",width:'100%',objectFit:'contain'}}
                            src={`${el.thumbnail.path}.${el.thumbnail.extension}`}
                            /></Item>
                    ))}
                </Carousel>)}
            </Container>
        </Layout>
    )
}
