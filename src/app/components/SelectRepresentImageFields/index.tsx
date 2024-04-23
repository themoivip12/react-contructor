import { Col, Row, Space } from 'antd';
import { translations } from 'locales/translations';
import { ChangeEvent, memo, useCallback } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import DefaultPresentImage from '../../../imgs/default-represent-image.png';

import Input from '../Input';

const SelectRepresentImage = () => {
  const { t } = useTranslation();
  const { control, setValue, watch } = useFormContext();
  const link = watch('represent_image_large');
  const handleChangeImage = useCallback(
    (
      fieldName: string,
      e: ChangeEvent<HTMLInputElement>,
      fieldLinkName?: string,
    ) => {
      if (e.target.files && e.target.files[0]) {
        const image = URL.createObjectURL(e.target.files[0]);
        setValue(fieldName, e.target.files[0]);
        fieldLinkName && setValue(fieldLinkName, image);
      }
    },
    [],
  );
  return (
    <>
      <Col flex="none">
        <img
          className="w-100 represent-image"
          src={link || DefaultPresentImage}
          alt=""
        />
      </Col>
      <Col flex={'auto'} style={{ maxWidth: '750px' }}>
        <div className="w-100 h-100 pick-image">
          <label htmlFor="icon-button-file">
            <Controller
              name="represent_image_large_file"
              control={control}
              render={({ field }) => {
                return (
                  <>
                    <span color="default" className="tag-upload-img">
                      {field.value ? (
                        <span className="text-primary input-file">
                          {field.value.name}
                        </span>
                      ) : (
                        <span className="text-secondary">
                          {t(translations.main.createTitle)}
                        </span>
                      )}
                    </span>
                    <Input
                      id="icon-button-file"
                      type="file"
                      accept="image/*"
                      onChange={e =>
                        handleChangeImage(
                          field.name,

                          e,
                          'represent_image_large',
                        )
                      }
                      style={{ display: 'none' }}
                    />
                  </>
                );
              }}
            />
          </label>
          <label htmlFor="represent_image_medium">
            <Controller
              name="represent_image_medium_file"
              control={control}
              render={({ field }) => {
                return (
                  <>
                    <span color="default" className="tag-upload-img">
                      {field.value ? (
                        <span className="text-primary input-file">
                          {field.value.name}
                        </span>
                      ) : (
                        <span className="text-secondary">
                          {t(translations.main['210x312RepresentImage'])}
                        </span>
                      )}
                    </span>
                    <Input
                      id="represent_image_medium"
                      type="file"
                      accept="image/*"
                      onChange={e => handleChangeImage(field.name, e)}
                      style={{ display: 'none' }}
                    />
                  </>
                );
              }}
            />
          </label>
          <label htmlFor="represent_image_small">
            <Controller
              name="represent_image_small_file"
              control={control}
              render={({ field }) => {
                return (
                  <>
                    <span color="default" className="tag-upload-img">
                      {field.value ? (
                        <span className="text-primary input-file">
                          {field.value.name}
                        </span>
                      ) : (
                        <span className="text-secondary">
                          {t(translations.main['70x104RepresentImage'])}
                        </span>
                      )}
                    </span>
                    <Input
                      id="represent_image_small"
                      type="file"
                      accept="image/*"
                      onChange={e => handleChangeImage(field.name, e)}
                      style={{ display: 'none' }}
                    />
                  </>
                );
              }}
            />
          </label>
        </div>
      </Col>
    </>
  );
};

export default memo(SelectRepresentImage);
