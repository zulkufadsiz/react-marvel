import React, {useEffect,useReducer} from 'react';
import {Layout,Row,Col} from "antd";
import YoutubeEmbed from "../components/YoutubeEmbed";
import './Home.less';
import CharacterCard from "../components/CharacterCard";
import axios from "axios";
import {CHARACTERS} from "../../config/Common";

const {Header,Content} = Layout;
export default function Home(){
    const SET_DATA = "SET CHARACTERS";
    const HANDLE_MORE = "HANDLE MORE";
    const initialState = {
        offset: 0,
        data:[],
        total:0
    };

    const onScroll = (event) => {
            const { scrollTop, scrollHeight, clientHeight } = event.srcElement.body.clientHeight;
            if (scrollTop + clientHeight === scrollHeight) {
                // TO SOMETHING HERE
                if (state.offset < state.total){
                    getCharacters(state.offset + 30).then(res=>{
                        dispatch({type:HANDLE_MORE,payload:{data:res.data.results,offset:res.data.offset,total:res.data.total}})
                    });
                }
            }
    };
    function reducer(state, action) {
        switch (action.type) {
            case SET_DATA:{
                const { offset,data,total} = action.payload;
                return {
                    offset,
                    data,
                    total
                };
            }
            case HANDLE_MORE:{
                const { offset,data,total} = action.payload
                return { offset,data,total};
            }
            default:
                return initialState;
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(()=>{
        getCharacters(0).then(res=>{
           dispatch({type:SET_DATA,payload:{data:res.data.results,offset:res.data.offset,total:res.data.total}})
        })
    },[]);
    useEffect(()=>{
        window.addEventListener('scroll',onScroll);
        return()=>{
            window.removeEventListener('scroll',onScroll);
        }
    },[]);
    const getCharacters = async(offset,limit=30) => {
        const params = {
            limit,
            offset
        }
        return new Promise((resolve,reject)=>{
            axios.get(CHARACTERS,{params}).then(({status,data}) => {
                if (status ===200){
                    resolve(data);
                }
            }).catch(err => reject(err));
        })
    }
    return(
        <div>
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
                <Row justify='center'>
                    {state.data.length > 0 && state.data.map((item,i) =><Col key={i} xs={{span: 24}} sm={{span: 12}} md={{span: 8}} lg={{span: 6}}>
                        <CharacterCard data={item}/>
                    </Col>)}
                </Row>
            </div>
            </Content>
        </div>
    )
}
