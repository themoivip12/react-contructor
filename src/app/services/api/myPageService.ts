import {createService} from './axios';


const instance = createService(process.env.REACT_APP_API_URL);


const updateAuthor = async (formData: FormData): Promise<any> => {
    const url = `/v2/charbet-house/author/`;
    const result = await instance.put(url, formData, {});
    return result.data;
}

const checkDuplicateAuthorName = async (name: string): Promise<any> => {
    const url = `/v2/charbet-house/author/check/`;
    const result = await instance.get(url, {params: {name}});
    return result.data;
}

export default {updateAuthor, checkDuplicateAuthorName};
