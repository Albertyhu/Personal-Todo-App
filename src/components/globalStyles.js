import styled from 'styled-components'; 

export const MainCont = styled.div`
    width: 100%; 
`

export const Button = styled.div`
    width: 100%;
    text-align: center; 
    background-color: ${props => props.BackgroundColor || "#333333" };
    color: ${props => props.Color || "#000000"}; 
    border-radius: 5px; 
    cursor: pointer; 
    user-select: none;
    white-space: nowrap;
    padding: 10px 0;
    opacity: ${props => props.Opacity || "1.0"}; 
    &:active{
        transform: ${props => props.Transform || "translateX(5px) translateY(5px)"}; 
    }
    @media screen and (max-width: 1200px){
    
    }
    @media screen and (max-width: 900px){
    
    }
    @media screen and (max-width: 540px){
    
    }
    @media screen and (max-width: 360px){
    
    }
`

export const Title = styled.h2`
    text-align: center; 
`

export const TodoBody = styled.div`
display: grid;
grid-template-columns: 20% 60% 20%; 
`

export const TodoPanel = styled.div`
border-radius: 10px;
border: 2px solid #000000; 
width: 100%; 
min-height: 100px;
`
export const TopSection = styled.div`
    width: 90%;
    margin: 10px auto;
    display: block; 
    border-bottom: 1px solid #000; 
` 

export const MainColumn = styled.div``
export const SideColumn = styled.div``

export const LogOutButton = styled.div`
    width: 40px;
    text-align: center;
    background-color: ${props => props.BackgroundColor || "#333333"};
    color: ${props => props.Color || "#000000"}; 
    border-radius: 2px;
    border: 1px solid #000;
    cursor: pointer; 
    user-select: none;
    white-space: nowrap;
    padding: 10px 0;
    box-shadow: 5px 5px 5px #000;
    margin: 10px auto;
    font-size: 10px;
    &:active{
        transform: ${props => props.Transform || "translateX(5px) translateY(5px)"}; 
    }
    @media screen and (max-width: 1200px){
    
    }
    @media screen and (max-width: 900px){
    
    }
    @media screen and (max-width: 540px){
    
    }
    @media screen and (max-width: 360px){
    
    }
`

export const ListItem = styled.div`
display: grid;
grid-template-columns: 70% 30%; 
border-bottom: 1px solid #000; 
`

export const TaskText = styled.div`
font-size: 25px;
`

export const ListItemIconWrapper = styled.div`
& > *{
    display: inline-block; 
}
`

export const IconWrapper = styled.div`
    width: auto; 
    display: flex;
    &>*{
        width: 20px; 
        height: 20px;
        margin: auto;
    }
    &#visibilityIcon{
        cursor: pointer;
    }
    &#button{
        cursor: pointer 
    }
`

export const AddPanel = styled.div`
    position: absolute;
    border-radius: 10px; 
    border:1px solid #000; 
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    width: 300px; 
    left: 0; 
    right: 0; 
    top: 30%;
    margin-left: auto; 
    margin-right: auto; 
    background-color: ${props=>props.BackgroundColor || "#fff"};
`

export const AddPanelInputWrapper = styled.div`
    border-radius: 10px; 
    border: 1px solid #000; 
    width: 90%; 
    margin: 20px auto; 
`

export const AddPanelInput = styled.input`
    width: auto;
    border-radius: 10px; 
    outline: none; 
    border: none;
`

export const AddPanelButtonWrapper = styled.div`
    justify-content: space-around;
    margin: 0px auto; 
    & >* {
    display: inline-block; 
}
`