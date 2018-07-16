import axios from 'axios';

const instance= axios.create({
    baseURL:'https://react-burger-4d788.firebaseio.com/',

});

export default instance;
