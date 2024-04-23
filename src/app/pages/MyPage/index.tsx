import React, {useState, memo} from "react";
import {Col, Layout, Row, Typography, Tooltip, Input, Button} from "antd";
import {useTranslation} from "react-i18next";

import myPageService from "../../services/api/myPageService"
import {translations} from "../../../locales/translations";
import {notification} from "../../../utils/helpers";

const MyPage = () => {
    const {t} = useTranslation();
    const [authorName, setAuthorName] = useState('');
    const onAuthorNameChange = (value: any) => {
        setAuthorName(value)
    }
    const submitForm = async (e: any) => {
        e.preventDefault();
        if (!authorName || !authorName.length || authorName === '') {
            notification.error({message: 'Close', description: "Vui lòng nhập tên tác giả!"});
            return;
        }
        try {
            const resultCheckDuplicate = await myPageService.checkDuplicateAuthorName(authorName);
            if (resultCheckDuplicate && resultCheckDuplicate.result) {
                await updateUser();
            } else {
                if (resultCheckDuplicate) {
                    notification.error({message: 'Close', description: resultCheckDuplicate.message});
                } else {
                    console.log(e)
                }
            }
        } catch (e) {
            console.log(e)
        }


    };

    async function updateUser() {
        try {
            const formDataUpdate = new FormData();
            formDataUpdate.append('name', authorName);
            formDataUpdate.append('user', '7d8f67f4-e126-4da7-9e49-d832a5b91bc2');
            const resultUpdateUser = await myPageService.updateAuthor(formDataUpdate);
            if (resultUpdateUser) {
                console.log(resultUpdateUser);
            } else {
                notification.error({message: 'Close', description: 'Cập nhật thất bại'});
            }
        } catch (e: any) {
            notification.error({
                message: 'Close',
                description: e.response.data.message
            });
            return;
        }
    }

    return (
        <Layout.Content>
            <div className="container-page">
                <div className="distanceTag">
                    <Tooltip title={t(translations.myPage.header)}>
                        <label className="text-white titleMyPage">{t(translations.myPage.header)}</label>
                    </Tooltip>
                </div>

                <div className="">
                    <form onSubmit={submitForm}>
                        <div className="form-item">
                            <label>{t(translations.myPage.authorName)}</label>
                            <div className="item-authorName">
                                <Input
                                    value={authorName}
                                    onChange={e => onAuthorNameChange(e.target.value)}
                                    placeholder={t(translations.myPage.authorNamePlaceholder)}
                                />
                                <Button onClick={submitForm} className="btn-submit"
                                        shape="round">{t(translations.myPage.editBtn)}</Button>
                            </div>

                        </div>

                    </form>

                </div>

                <div>
                    <div className="confirmDeleteAccount">
                        <label className="text-white">{t(translations.myPage.deleteAccount)}</label>
                    </div>
                    <div className="confirmDeleteAccount--btn">
                        <Button shape="round">{t(translations.payment.myProceedsPlaceholder)}</Button>
                    </div>
                </div>
            </div>
        </Layout.Content>
    )
}


export default memo(MyPage);
