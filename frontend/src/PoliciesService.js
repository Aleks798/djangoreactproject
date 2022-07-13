import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class PoliciesService{

	constructor(){}


	getPolicies() {
		const url = `${API_URL}/api/policies/`;
		return axios.get(url).then(response => response.data);
	}
	getPoliciesByURL(link){
		const url = `${API_URL}${link}`;
		return axios.get(url).then(response => response.data);
	}
	getPolicy(pk) {
		const url = `${API_URL}/api/policies/${pk}`;
		return axios.get(url).then(response => response.data);
	}
	deletePolicy(policy){
		const url = `${API_URL}/api/policies/${policy.pk}`;
		return axios.delete(url);
	}
	createPolicy(policy){
		const url = `${API_URL}/api/policies/`;
		return axios.post(url,policies);
	}
	updatePolicy(policy){
		const url = `${API_URL}/api/policies/${policy.pk}`;
		return axios.put(url,policy);
	}
}