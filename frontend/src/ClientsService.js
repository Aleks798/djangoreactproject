import axios from 'axios';
// const API_URL = 'http://localhost:8000';
const API_URL = 'http://192.168.56.102:8000';

export default class ClientsService{

	constructor(){}


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
		const config = {headers: {"Access-Control-Allow-Origin": "*"}};
		return axios.post(url, client, config);
	}
	updateClient(client){
		const url = `${API_URL}/api/clients/${client.pk}`;
		console.log('updateClient(client): url ='+url);
		console.log(client);
		const config = {headers: {"Access-Control-Allow-Origin": "*"}};
		return axios.put(url, client, config);
	}
}