import axios from 'axios';
// const API_URL = 'http://localhost:8000';
const API_URL = 'http://192.168.56.102:8000';

export default class RefService{

	//constructor(){}


	getRefs(refUrl) {
		const url = `${API_URL}/api/${refUrl}/`;
		return axios.get(url).then(response => response.data);
	}
	getRefByURL(link){
		const url = `${API_URL}${link}`;
		return axios.get(url).then(response => response.data);
	}
	getRef(pk, refUrl) {
		const url = `${API_URL}/api/${refUrl}/${pk}`;
		//console.log('getRef(pk, refUrl): refUrl = '+refUrl);
		return axios.get(url).then(response => response.data);
	}
	deleteRef(referenceObj){
		const url = `${API_URL}/api/clients/${referenceObj.pk}`;
		return axios.delete(url);
	}
	createElement(referenceObj, refUrl){
		const url = `${API_URL}/api/${refUrl}/`;
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
		axios.defaults.headers.post['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization';
		return axios.post(url, referenceObj);
	}
	updateElement(referenceObj, refUrl){
		const url = `${API_URL}/api/${refUrl}/${referenceObj.pk}`;
		////console.log('updateRef(client): url ='+url);
		axios.defaults.headers.put['Access-Control-Allow-Origin'] = '*';
		axios.defaults.headers.put['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization';
		return axios.put(url, referenceObj);
	}
}