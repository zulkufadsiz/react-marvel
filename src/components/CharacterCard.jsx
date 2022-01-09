import React from 'react';
import {Card,Button} from "antd";
import './CharacterCard.less';
export default function CharacterCard({data}){
    console.log('Data',data);

    return(
        <Card className='character'>
            <img
                className='character__avatar'
                src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
                alt='Wanda Maximoff'/>
            <div className='character__footer'>
                <div className='character__footer__content'>
                    <h6>{data.name}</h6>
                    <div className='character__footer__content--center'>
                        <Button type='link'>Detail</Button>
                    </div>
                </div>
            </div>
        </Card>
    )
}
