import React from 'react';
import { Input, Button, Card } from '../components/index';
import { AiOutlineUser, AiOutlineMail, AiOutlineKey } from 'react-icons/ai';

const Login = () => {

    return (
        <div className="flex justify-center items-center h-full overflow-hidden">
            <div className='w-full pl-16 pr-1 pt-16'>
                <Card width='100%' height='70vh'>
                    <Card.Header>Create Account</Card.Header>
                    <Input type="text" required title="username" icon={<AiOutlineUser />} />
                    <Input type="email" required title="email" icon={<AiOutlineMail />} />
                    <Input type="password" required title="password" icon={<AiOutlineKey />} />
                    <Button type="error" className="mt-4">Sign Up</Button>
                </Card>
            </div>

            <div className='w-full pr-16 pl-1 pt-16'>
                <Card width='100%' height='70vh'>
                    <Card.Header>Sign In</Card.Header>
                    <Input type="text" required title="username" icon={<AiOutlineUser />} />
                    <Input type="password" required title="password" icon={<AiOutlineKey />} />
                    <p href="#" className="text-sm text-gray-600 mt-2">Forgot your password?</p>
                    <Button type="error" className="mt-4">Sign In</Button>
                </Card>
            </div>
        </div>
    )
}

export default Login
