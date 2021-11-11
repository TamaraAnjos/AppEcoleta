import AsyncStorage from '@react-native-community/async-storage';

const BASE_API = 'https://appapiecoleta.herokuapp.com/api';

export default {
    
    checkToken: async (token) => {
        
        const req = await fetch(`${BASE_API}/auth/refresh`, {
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token})
        })
        
        const json = await req.json();
        return json;

    },
    signIn: async (email, password) => {
        const req = await fetch(`${BASE_API}/auth/login`, {
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });
        console.log("req", req);
        const json = await req.json();
       return json;
    },

    signUp: async (name, email, password) => {
        console.log('name:', name);
        console.log('email:', email);
        console.log('password:', password);
        const req = await fetch(`${BASE_API}/user`, {
            method: 'POST',
            headers:{
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        })
        const json = await req.json();
        return json;

    },

    logout: async () => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/auth/logout`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token})
        });
        const json = await req.json();        
        return json;
    },
    getCooperativas: async (lat=null, lng=null, address=null) => {
        const token = await AsyncStorage.getItem('token');
        
        console.log("LAT", lat);
        console.log("LNG", lng);
        console.log("ADDRESS", address);
        const req = await fetch(`${BASE_API}/cooperativas?token=${token}&lat=${lat}&lng=${lng}&address=${address}`);
        const json = await req.json();
        return json;
        
    },
    getCooperativa: async (id) => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/cooperativa/${id}?token=${token}`);
        const json = await req.json();
        return json;
    },
    setFavorite: async (cooperativaId) => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/user/favorite?token=${token}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({cooperativa: cooperativaId}),
        });
        const res = await req.json();        
        return res;
    },
    setAppointment: async (
        userId,
        service,
        selectedYear,
        selectedMonth,
        selectedDay,
        selectedHour
        ) => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/cooperativa/${userId}/appointment`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token,
                id: userId,
                service,
                year: selectedYear,
                month: selectedMonth,
                day: selectedDay,
                hour: selectedHour,
            }),
        });
        const res = await req.json();        
        return res;
    },
    search: async (cooperativaName) => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/search?q=${cooperativaName}&token=${token}`,);
        const res = await req.json();
        return res;
    },
    getFavorites: async () => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/user/favorites?token=${token}`,);
        const res = await req.json();
        return res;
    },
    getAppointments: async () => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/user/appointments?token=${token}`,);
        const res = await req.json();
        return res;
    },
    updateUser: async (body) => {
        const token = await AsyncStorage.getItem('token');
        console.log(body);
        body.token = token;
        console.log(body);
        const req = await fetch(`${BASE_API}/user`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const json = await req.json();
        console.log(json);     
        return json;
    },
    updateAvatar: async (avatar) => {
        const token = await AsyncStorage.getItem('token');
        console.log(avatar);
        const req = await fetch(`${BASE_API}/user/avatar`, {
            method: 'POST',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'image/jpeg'

            },
            body: JSON.stringify({avatar})
        });
        const json = await req.json();
        console.log(json);
        return json;
    },

    getUser: async() => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/user?token=${token}`);
        const json = await req.json();
        return json;
        
    },
};
