import axios from 'axios';
// const API_URL = 'http://localhost:8000';
const API_URL = 'http://192.168.56.102:8000';

export default class ClientsService{

	//constructor(){}


	getClients() {
		const url = `${API_URL}/api/clients/`;
		return axios.get(url).then(response => response.data);
	}
	getClientsByURL(link){
		const url = `${API_URL}${link}`;
		return axios.get(url).then(response => response.data);
	}
	getClient(pk) {
		const url = `${API_URL}/api/clients/${pk}`;
		return axios.get(url).then(response => response.data);
	}
	deleteClient(client){
		const url = `${API_URL}/api/clients/${client.pk}`;
		return axios.delete(url);
	}
	createClient(client){
		const url = `${API_URL}/api/clients/`;
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
		axios.defaults.headers.post['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization';
		return axios.post(url, client);
	}
	updateClient(client){
		const url = `${API_URL}/api/clients/${client.pk}`;
		console.log('v.13 updateClient(client): url ='+url);
		axios.defaults.headers.put['Access-Control-Allow-Origin'] = '*';
		axios.defaults.headers.put['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization';
		return axios.put(url, client);
	}
}