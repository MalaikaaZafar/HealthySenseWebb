import axios from 'axios';

const signup = async (data) => {
    axios.post('http://localhost:3000/signup', data)
        .then(res => {
            console.log(res);
            return res;
        })
        .catch(err => {
            console.log(err);
            return false;
        })
}

export default signup;