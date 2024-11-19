import React from 'react'
import styled from 'styled-components'

const Inputs = ({ type, title, required, icon }) => {
    return (
        <Container>
            {title && <Title>{title}
                {required && <Required>*</Required>}
            </Title>}
            <InputWrapper>
                {icon && <Icon>{icon}</Icon>}
                <Input
                    type={type}
                    $hasIcon={!!icon}
                />
            </InputWrapper>
        </Container>
    )
}

export default Inputs

const Container = styled.label`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
`

const Title = styled.div`
    font-size: 1rem;
`

const Required = styled.span`
    color: tomato;
`

const InputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`

const Icon = styled.div`
    position: absolute;
    left: 0.5rem;
    font-size: 1.2rem;
    color: #ccc;
`

const Input = styled.input`
    padding: ${(props) => (props.$hasIcon ? '0.25rem 0.25rem 0.25rem 2rem' : '0.25rem')};
    font-size: 1rem;
    border: 1px solid #eee;
    border-radius: 0.25rem;
    width: 100%;

    &:focus {
        outline-color: dodgerblue;
        outline-width: 1px;
    }
`