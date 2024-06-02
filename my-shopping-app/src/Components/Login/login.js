import './login.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        username: "",
        password: "",
    });
    const [status, setStatus] = useState();

    const handleSubmitEvent = (e) => {
        e.preventDefault();
        if (input?.username !== '' && input?.password !== '') {
            const userData = {

                username: input?.username,
                password: input?.password,
                expiresInMins: 30,
            }
            axios.post('https://dummyjson.com/auth/login', userData
            )

                .then(res => setStatus(res?.data))
                .catch(err => setStatus(err));
        }
        else {
            alert("please provide an input");
        }
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(()=>{
        if (status?.token) {
            navigate('/products');
        }
        else if(status?.message === 'Request failed with status code 400') {
            alert("please provide a valid input");
        }
        // eslint-disable-next-line
    },[status?.token,status])
    
    return (
        <div className="background">

            <Grid
                container
                className="container"
                style={{ width: '50%' }}
            >

                <Grid item xs={12} className='gridDisplay grid1'>
                    Login
                </Grid>
                <Grid item xs={12} className='gridDisplay grid2'>
                    Username:
                    <input name="username"
                        onChange={handleInput} value={input?.username || ""} className='input' />
                </Grid>
                <Grid item xs={12} className='gridDisplay grid2'>
                    Password:
                    <input name="password"
                        onChange={handleInput} vallue={input?.password || ""} className='input' />
                </Grid>
                <Grid item xs={12} className='gridDisplay'>
                    <Button variant="contained" className="button" onClick={handleSubmitEvent}>Login</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default Login;