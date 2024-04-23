import { Button, Checkbox, Col, Radio, Select, Space } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import CheckableTag from 'antd/lib/tag/CheckableTag';
import Input from 'app/components/Input';
import { translations } from 'locales/translations';
import { debounce, get } from 'lodash';
import { ChangeEvent, memo, useCallback, useEffect, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { FilterParams, PUBLIC_TYPE, WEEK_DAYS, WHETHER_THE_WORK } from 'types';
import { SearchOutlined, CheckOutlined, DownOutlined } from '@ant-design/icons';

import HashIcon from '../../../../../imgs/hash.svg';

import { mainSelector } from '../../slice/selector';

const WorkForm = () => {
  const { t } = useTranslation();
  const { control } = useFormContext();
  const dispatch = useDispatch();

  const [keywordFilter, setKeywordFilter] = useState<FilterParams>({
    page: 1,
    page_size: 10,
  });

  const { categories, keywordPageable } = useSelector(mainSelector);

  const options = Object.values(WEEK_DAYS).map(item => ({
    label: t(get(translations.common.weekDays, item)),
    value: Number(item),
  }));

  const handleSearchKeyword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const handleChangeKeyword = debounce(e => {
        setKeywordFilter(pre => ({
          ...pre,
          page: 1,
          search: e.target.value,
        }));
      }, 500);
      handleChangeKeyword.cancel();
      handleChangeKeyword(e);
    },
    [],
  );

  // useEffect(() => {
  //   dispatch(actions.searchKeywords(keywordFilter));
  // }, [keywordFilter, dispatch, actions]);

  return (
    <Space size={20} direction="vertical" className="w-100">
      <Space size={12} direction="vertical" className="w-100">
        <p className="h3">{t(translations.main.createTitle)}</p>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Radio.Group
              {...field}
              onChange={e => {}}
              style={{ display: 'flex', gap: '40px' }}
            >
              {Object.keys(WHETHER_THE_WORK).map(item => (
                <Radio value={get(WHETHER_THE_WORK, item)} key={item}>
                  {t(get(translations.common.whetherTheWork, item))}
                </Radio>
              ))}
            </Radio.Group>
          )}
        />
      </Space>
      <Space size={12} direction="vertical" className="w-100">
        <div>
          <p className="h3">{t(translations.main.enterTitleYourWork)}</p>
          <p className="body2 gray-6">
            {t(translations.main.limit30Character)}
          </p>
        </div>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              size="large"
              placeholder={t(translations.main.enterTitleYourWork)}
              maxLength={30}
            />
          )}
        />
      </Space>

      <Space size={12} direction="vertical" className="w-100">
        <p className="h3">{t(translations.main.selectGent)}</p>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              showSearch
              size="large"
              className="w-100"
              placeholder={t(translations.main.selectGentPlaceholder)}
              filterOption={(input, option) =>
                (option!.children as unknown as string)
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            >
              {categories.map(item => (
                <Select.Option value={item.id} key={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          )}
        />
      </Space>
      <Space size={12} direction="vertical" className="w-100">
        <div>
          <p className="h3">{t(translations.main.briefYourWork)}</p>
          <p className="body2 gray-6">
            {t(translations.main.briefYourWorkLimit1000Character)}
          </p>
        </div>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextArea
              {...field}
              rows={4}
              onBlur={e => field.onChange(e.target.value.trim())}
              placeholder={t(translations.main.briefYourWorkPlaceholder)}
              maxLength={1000}
            />
          )}
        />
      </Space>
      <Space size={12} direction="vertical" className="w-100">
        <div>
          <p className="h3">{t(translations.main.selectWorkTag)}</p>
          <p className="body2 gray-6">
            {t(translations.main.duplicateIsPossible)}
          </p>
        </div>
        <Input
          placeholder={t(translations.main.selectWorkTagPlaceholder)}
          onChange={handleSearchKeyword}
          prefix={<SearchOutlined />}
        />
        <div>
          <Controller
            name="keywords"
            control={control}
            render={({ field }) => (
              <>
                {keywordPageable?.results.map(tag => (
                  <CheckableTag
                    key={tag.id}
                    checked={field.value?.includes(tag.id)}
                    onChange={checked => {
                      checked
                        ? field.onChange((field.value || []).concat(tag.id))
                        : field.onChange(
                            field.value.filter(
                              (item: number) => item !== tag.id,
                            ),
                          );
                    }}
                  >
                    {field.value?.includes(tag.id) ? (
                      <CheckOutlined />
                    ) : (
                      <img src={HashIcon} alt="hash" />
                    )}{' '}
                    {tag.name}
                  </CheckableTag>
                ))}
              </>
            )}
          />
          {keywordPageable &&
            keywordPageable.count > keywordPageable.results.length && (
              <Button
                type="link"
                className="read-more"
                onClick={() => {
                  setKeywordFilter(pre => ({
                    ...pre,
                    page: (pre.page || 1) + 1,
                  }));
                }}
              >
                {t(translations.common.readMore)}
                <DownOutlined />
              </Button>
            )}
        </div>
      </Space>
      <Space size={12} direction="vertical" className="w-100">
        <p className="h3">{t(translations.main.discloseOrNot)}</p>
        <Controller
          name="publish_type"
          control={control}
          render={({ field }) => (
            <Radio.Group {...field}>
              {Object.keys(PUBLIC_TYPE).map(item => (
                <Radio value={Number(get(PUBLIC_TYPE, item))} key={item}>
                  {t(get(translations.common.publicType, item))}
                </Radio>
              ))}
            </Radio.Group>
          )}
        />
      </Space>
      <Space size={12} direction="vertical" className="w-100">
        <div>
          <p className="h3">{t(translations.main.selectDatePublic)}</p>
          <p className="body2 gray-6">
            {t(translations.main.duplicateIsPossible)}
          </p>
        </div>
        <Controller
          name="publish_days"
          control={control}
          render={({ field }) => (
            <Checkbox.Group {...field} options={options} />
          )}
        />
      </Space>
    </Space>
  );
};

export default memo(WorkForm);
