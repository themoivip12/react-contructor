import {
  forwardRef,
  memo,
  UIEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { FilterAsyncSelectParams, IPageable } from 'types';
import { useDebounce } from 'app/hooks/useDebounce';
import { Select, SelectProps } from 'antd';
import { DefaultOptionType } from 'antd/lib/select';

interface Option {
  id: unknown;
  name: string;
  label: string;
}

interface Props<T> extends Omit<SelectProps, 'options'> {
  pageable?: IPageable<T>;
  fetchData: ({ page, page_size, keyWord }: FilterAsyncSelectParams) => void;
  pageSize?: number;
  defaultValue?: T;
}

const AsyncSelect = forwardRef(
  <T extends Option>(
    {
      onChange,
      fetchData,
      pageable,
      value,
      defaultValue,
      pageSize = 20,
      disabled,
      ...other
    }: Props<T>,
    ref: any,
  ) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [options, setOptions] = useState<DefaultOptionType[]>([]);

    useEffect(() => {}, [pageable]);
    useEffect(() => {
      setOptions(
        (pageable?.results as DefaultOptionType[]) ||
          ([] as DefaultOptionType[]),
      );
      setLoading(false);
    }, [pageable]);
    const [search, setSearch] = useState('');
    const defaultOption = value ? defaultValue : null;
    const debounceSearch = useDebounce(search);
    useEffect(() => {
      fetchData({ page: 1, page_size: pageSize, keyWord: debounceSearch });
    }, [debounceSearch]);

    const handlePopupScroll = useCallback((e: UIEvent) => {
      console.log(e.target);
    }, []);

    return (
      <Select
        {...other}
        options={options as DefaultOptionType[]}
        size="small"
        loading={loading}
        onPopupScroll={handlePopupScroll}
      />
    );
  },
);

export default memo(AsyncSelect);
