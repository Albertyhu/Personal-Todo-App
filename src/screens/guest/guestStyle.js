import styled from 'styled-components'; 

export const Shell = styled.div`
    width: 80%; 
    margin: 0px auto; 
    @media screen and (min-width: 540px) {
        width: 500px; 
    } 
`

export const Form = styled.form`

`

export const InputWrapper = styled.div`
    margin-top: 10px;
    display: grid;
    grid-template-columns: 10% 80% 10%; 
    width: 100%;    
    height: 100%;
    border: 1px solid rgba(0, 0, 0, 0.3); 
    border-radius: 10px; 
    justify-content: center; 
    &:focus {
    border: 1px solid red; 
}
    @media screen and (max-width: 380px){
            grid-template-columns: 10% 80% 10%; 
    }    
`

export const InputField = styled.label`
    width: 100%; 
    display: grid;
    grid-template-rows: 16% 42% 42%;
    height: 100px;
    row-gap: 10px;
    margin: 40px auto;
` 

export const Input = styled.input`
    width: 100%; 
    font-family: inherit;
    padding-left: 10px;
    border: 0px;
    border-radius: 20px;
    &:focus {
        border: none;
        outline: none;
    }
`

export const ErrorField = styled.div`
    height: 30px; 
    &#AddPanelErrorField, &#EditError{
        height: 50px;
        width: 90%;
        margin: 0px auto;
    }


`
export const ErrorMessage = styled.div`
    color: #d93838;
   
`

export const Title = styled.h2`
    text-align: center; 
` 
export const SubTitle = styled.h3`
    margin-top: 0;
    margin-bottom: 0;
    margin-right: 10px;
    float: left;
`

export const GreenCheckMarkWrapper = styled.span`
    & > * {
        color: #33FF77; 
        height: 20px; 
        width: 20px;
    }
`

export const FormButton = styled.input`
    width: 100%;
    font-family: 'Comic Sans MS';
    text-align: center;
    background-color: ${props => props.BackgroundColor || "#333333"};
    color: ${props => props.Color || "#000000"}; 
    border: none; 
    border-radius: 15px; 
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

export const DisabledButton = styled.div`

`