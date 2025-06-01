const API_URL = 'http://localhost:5000/auth/';

const register = async (username, password) => {
    try {
        const response = await fetch(API_URL + 'register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password})
        });

        if(!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Falha no registro. Erro desconhecido.');
        }

        return response.json();
    } catch (error) {
        console.error('Erro ao registrar: ', error);
        throw error;
    }
};

const login = async (username, password) => {
    try {
        const response = await fetch(API_URL + 'login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        });

        const data = await response.json();

        if(response.ok) {
            localStorage.setItem('userToken', data.accessToken);
            return data;
        } else {
            throw new Error(data.message || 'Falha no login. Credenciais inválidas.');
        }
    } catch (error) {
        console.error('Erro ao fazer login: ', error);
        throw error;
    }
};

const logout = () => {
    localStorage.removeItem('userToken');
};

const getToken = () => {
    return localStorage.getItem('userToken');
};

const authService = {
    register,
    login,
    logout,
    getToken,
};

export default authService;