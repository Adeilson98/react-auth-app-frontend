const API_URL = 'http://localhost:5000/api/products';

const getAuthHeaders = () => {
    const token = localStorage.getItem('userToken');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
    };
};

const createProduct = async (productData) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(productData),
        });

        const data = await response.json();

        if(!response.ok) {
            if(response.status === 401 || response.status === 403) {
                throw new Error('Sessão expirada ou não autorizada. Por favor, faça login novamente')
            }

            throw new Error(data.message || 'Falha ao criar produto.');
        }

        return data;
    } catch (error) {
        console.error('Errro ao criar produto: ', error)
    }
}

const getMyProducts = async () => {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: getAuthHeaders(),
        });

        if(!response.ok) {
            if(response.status === 401 || response.status === 403) {
                throw new Error('Sessão expirada ou não autorizada. Por favor, faça login novamente.');
            }

            const errorData = await response.json();
            throw new Error(errorData.message || 'Falha ao buscar produtos.');
        }

        return response.json();
    } catch (error) {
        console.error('Errro ao buscar produtos: ', error);
        throw error;
    }
};

const productService = {
    createProduct,
    getMyProducts
};

export default productService;