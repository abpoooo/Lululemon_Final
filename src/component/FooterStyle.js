import styled from 'styled-components';

export const Box = styled.div`
  //display: flex;
  //min-height: 100%;
  //margin-top: auto;
  //  padding: 20px 20px;
    padding: 25px 10px 10px 10px;
    background: none;
    position: relative;
    bottom: 0;
    width: 1300px;
    justify-content: center;
    align-content: center;
    align-items: center;
    overflow: hidden;
    //height: 300px;
    
    @media (max-width: 1330px) {
      width: 100%;
      margin: 0;
        padding: 30px 30px;
    }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 100%;
    margin: 0 10px;
  //align-items: center;
  //justify-content: center;
  //left: 30px;
    
`

export const Row = styled.div`
 display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: auto;
  //align-items: center;
  //justify-content: center;
  
  
  
    //display: grid;
    //grid-template-columns: repeat(auto-fill, minmax(220px, 220px));
    //grid-gap: 70px;
    
    
    @media (max-width: 1000px) {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      width: auto; 
      
    //grid-template-columns: repeat(auto-fill, minmax(240px, 220px));
    }
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-left: 40px;
    width: 260px;
`;

export const Column2 = styled.div`
    display: flex;
    flex-direction: row;
    text-align: left;
    margin-left: 40px;
    font-size: 35px;
    width: 200px;
    cursor: pointer;
`;

export const Heading = styled.p`
    font-size: 14px;
    color: black;
    margin-bottom: 22px;
    font-weight: bold;
    display: inline-block;
    position: relative;
    
    &:hover {
    cursor: pointer;
    }
    
    &:after {
        content: '';
        position: absolute;
        width: 100%;
        transform: scaleX(0);
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: #d31334;
        transform-origin: bottom left;
        transition: transform 0.25s ease-out;
    }
    &:hover:after {
    transform: scaleX(0.6);
    transform-origin: bottom left;
    }
`;

export const FooterLink = styled.a`
    color: black;
    margin-bottom: 24px;
    font-size: 17px;
    text-decoration: none;
    display: inline-block;
    position: relative;

    &:hover {
    cursor: pointer;
    }

    &:after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #d31334;
    transform-origin: bottom left;
    transition: transform 0.25s ease-out;
    }
    &:hover:after {
    transform: scaleX(0.6);
    transform-origin: bottom left;
    }
`;
