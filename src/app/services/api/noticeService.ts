import {createServiceFormData} from './axios';

const instance = createServiceFormData(process.env.REACT_APP_API_URL);


const createNovelNotice = async (formData: FormData): Promise<any> => {
    const url = `/v2/charbet-house/novel/notice/`;
    const result = await instance.post(url, formData, {});
    return result.data;
}
const createComicNotice = async (formData: FormData): Promise<any> => {
    const url = `/v2/charbet-house/comic/notice/`;
    const result = await instance.post(url, formData, {});
    return result.data;
}

const updateNovelNotice = async (formData: FormData, uuid: string): Promise<any> => {
    const url = `/v2/charbet-house/novel/notice/${uuid}/`;
    const result = await instance.put(url, formData, {});
    return result.data;
}
const updateComicNotice = async (formData: FormData, uuid: string): Promise<any> => {
    const url = `/v2/charbet-house/comic/notice/${uuid}/`;
    const result = await instance.put(url, formData, {});
    return result.data;
}
const deleteNovelNotice = async (uuid: string): Promise<any> => {
    const url = `/v2/charbet-house/novel/notice/${uuid}/`;
    const result = await instance.delete(url);
    return result.data;
}
const deleteComicNotice = async (uuid: string): Promise<any> => {
    const url = `/v2/charbet-house/comic/notice/${uuid}/`;
    const result = await instance.delete(url);
    return result.data;
}
const getListNovelNotice = async (param: any): Promise<any> => {
    const url = `/v2/charbet-house/novel/notice/`;
    const result = await instance.get(url, {params: param});
    return result.data;
}
const getListComicNotice = async (param: any): Promise<any> => {
    const url = `/v2/charbet-house/comic/notice/`;
    const result = await instance.get(url, {params: param});
    return result.data;
}
const getDetailNovelNotice = async (uuid: string): Promise<any> => {
    const url = `/v2/charbet-house/novel/notice/${uuid}`;
    const result = await instance.get(url, {});
    return result.data;
}
const getDetailComicNotice = async (uuid: string): Promise<any> => {
    const url = `/v2/charbet-house/comic/notice/${uuid}`;
    const result = await instance.get(url, {});
    return result.data;
}
const publishNovelNotice = async (uuid: string, reservation: string): Promise<any> => {
    const url = `/v2/charbet-house/novel/publish/${uuid}`;
    const result = await instance.post(url, {reservation}, {});
    return result.data;
}
const publishComicNotice = async (uuid: string, reservation: string): Promise<any> => {
    const url = `/v2/charbet-house/comic/notice/${uuid}`;
    const result = await instance.post(url, {reservation}, {});
    return result.data;
}
const rejectNovelNotice = async (uuid: string): Promise<any> => {
    const url = `/v2/charbet-house/novel/notice/${uuid}`;
    const result = await instance.post(url, {}, {});
    return result.data;
}
const rejectComicNotice = async (uuid: string): Promise<any> => {
    const url = `/v2/charbet-house/comic/notice/${uuid}`;
    const result = await instance.post(url, {}, {});
    return result.data;
}
export default {
    createNovelNotice,
    createComicNotice,
    updateNovelNotice,
    updateComicNotice,
    deleteNovelNotice,
    deleteComicNotice,
    getListNovelNotice,
    getListComicNotice,
    getDetailNovelNotice,
    getDetailComicNotice,
    publishNovelNotice,
    publishComicNotice,
    rejectNovelNotice,
    rejectComicNotice,
};