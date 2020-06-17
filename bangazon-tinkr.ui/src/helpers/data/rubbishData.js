import axios from 'axios';
import {baseUrl} from '../apiKeys.json'

const getRubbishById = (rubbishId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/Rubbish/${rubbishId}`)
    .then((result) => resolve(result.data))
    .catch((error) => reject(error));
});

export default { getRubbishById };