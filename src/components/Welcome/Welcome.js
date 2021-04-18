import React from 'react'
import styled from "styled-components";
import { LoaderIcon } from '../../assets/Icons';

const Wrapper = styled.div`
.main{
margin-top: 150px;
}
.start{
    color: rgba(156,163,175);
    margin-bottom: 25px;
}
svg{
    margin-bottom: 20px;
    fill: rgba(156,163,175);
    height: 70px;
    width: 70px;
}
.newsfeed{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: rgba(107,114,128);
}
.link{
    font-size: 1.34rem;
    color: rgba(79,70,229) !important;
    text-decoration: underline;
}
*{
text-align: center;

}

  
`;

function Welcome() {
    return (
        <Wrapper>
        <div className="main">
            <LoaderIcon/>
            <h5 className="newsfeed bold">News Feed is empty </h5>
            <h5 className="start">Create your first post or start following people.</h5>
            <a className="link pointer bold" href="/suggestions">See Suggested People</a>
        </div>
        </Wrapper>
    )
}

export default Welcome
