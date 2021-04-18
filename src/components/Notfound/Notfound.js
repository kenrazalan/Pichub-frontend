import React from 'react'
import styled from "styled-components";
import notfound from '../../assets/404.svg'

const Wrapper = styled.div`
.main{
margin-top: 150px;
}
.start{
    color: rgba(156,163,175);
    margin-bottom: 25px;
}
img{
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

function Notfound() {
    return (
        <Wrapper>
        <div className="main">
            <img src={notfound} alt="notfound"/>
            <h5 className="newsfeed bold">Page Not Found </h5>
            <h5 className="start">Create your first post or start following people.</h5>
            <a className="link pointer bold" href="/">Go back to home.</a>
        </div>
        </Wrapper>
    )
}

export default Notfound
