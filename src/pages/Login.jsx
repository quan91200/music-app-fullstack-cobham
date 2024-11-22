import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { fadeIn, slideInLeft } from '../utilities/Animation';
import {
    Input,
    Button
} from '../components/index'

import {
    AiOutlineUser,
    AiOutlineMail,
    AiOutlineKey
} from 'react-icons/ai'

const Login = () => {
    const [signIn, toggle] = useState(true);

    return (
        <Wrapper>
            <Container>
                <SignUp $signinIn={signIn}>
                    <Form>
                        <Title>Create Account</Title>
                        <Input type='text' required title='username' icon={<AiOutlineUser />} />
                        <Input type='email' required title='email' icon={<AiOutlineMail />} />
                        <Input type='password' required title='password' icon={<AiOutlineKey />} />
                        <Button type='error'>Sign Up</Button>
                    </Form>
                </SignUp>

                <SignIn $signinIn={signIn}>
                    <Form>
                        <Title>Sign in</Title>
                        <Input type='text' required title='username' icon={<AiOutlineUser />} />
                        <Input type='password' required title='password' icon={<AiOutlineKey />} />
                        <Anchor href='#'>Forgot your password?</Anchor>
                        <Button type='error' >Sign In</Button>
                    </Form>
                </SignIn>

                <OverlayContainer $signinIn={signIn}>
                    <Overlay $signinIn={signIn}>
                        <LeftOverlay $signinIn={signIn}>
                            <Title>Welcome Back!</Title>
                            <Paragraph>
                                To keep connected with us please login with your personal info
                            </Paragraph>
                            <Button onClick={() => toggle(true)} type='outline-error' >
                                Sign In
                            </Button>
                        </LeftOverlay>

                        <RightOverlay $signinIn={signIn}>
                            <Title>Hello, Friend!</Title>
                            <Paragraph>
                                Enter Your personal details and start journey with us
                            </Paragraph>
                            <Button onClick={() => toggle(false)} type='outline-error'>
                                Sign Up
                            </Button>
                        </RightOverlay>
                    </Overlay>
                </OverlayContainer>
            </Container>
        </Wrapper>
    );
}

export default Login;

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    justify-content: center;
    align-items: center;
`;

const Container = styled.div`
    background-color: #fff;
    border-radius: .5rem;
    box-shadow: 0 0.875rem 1.75rem rgba(0, 0, 0, 0.25), 0 .625rem .625rem rgba(0, 0, 0, 0.22);
    position: relative;
    overflow: hidden;
    width: 100%;
    max-width: 100%;
    height: 100%;
`;

const SignUp = styled.div`
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
    left: 0;
    width: 50%;
    opacity: ${props => (props.$signinIn ? 0 : 1)}; 
    z-index: ${props => (props.$signinIn ? 1 : 5)}; 
    ${props => props.$signinIn !== true ? `
        transform: translateX(100%);
    ` : null}
`;

const SignIn = styled.div`
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
    left: 0;
    width: 50%;
    opacity: ${props => (props.$signinIn ? 1 : 0)}; 
    z-index: ${props => (props.$signinIn ? 2 : 1)};
    ${props => (props.$signinIn !== true ? `transform: translateX(100%);` : null)}
`;

const Form = styled.form`
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    text-align: center;
`;

const Title = styled.h1`
    font-weight: bold;
    margin: 0;
    animation: ${fadeIn} 0.6s forwards;
`;

const Anchor = styled.a`
    color: #333;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
`;

const OverlayContainer = styled.div`
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
    ${props => props.$signinIn !== true ? `transform: translateX(-100%);` : null}
`;

const Overlay = styled.div`
    background: #ff416c;
    background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
    background: linear-gradient(to right, #ff4b2b, #ff416c);
    color: #ffffff;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
    ${props => (props.$signinIn !== true ? `transform: translateX(50%);` : null)}
`;

const OverlayPanel = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
`;

const LeftOverlay = styled(OverlayPanel)`
    transform: translateX(-20%);
    ${props => props.$signinIn !== true ? css`
        animation: ${slideInLeft} 0.6s forwards;
    ` : null}
`;

const RightOverlay = styled(OverlayPanel)`
    right: 0;
    transform: translateX(0);
    ${props => props.$signinIn !== true ? css`
        animation: ${slideInLeft} 0.6s forwards;
    ` : null}
`;

const Paragraph = styled.p`
    font-size: 14px;
    font-weight: 100;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
`;
