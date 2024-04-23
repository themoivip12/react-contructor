import { path } from 'app/routes/path';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useAppDispatch } from 'store/configureStore';
import { IWork } from 'types';

import WorkList from '../components/WorkList';
import { searchComicThunk } from '../slice/actions';
import { mainSelector } from '../slice/selector';

const Novel = () => {
  const dispatch = useAppDispatch();
  const { novelPageable } = useSelector(mainSelector);
  const navigate = useNavigate();

  function handleClickCreate() {
    navigate(path.createWork.replace(':type', path.novel));
  }

  function handleClickItem(item: IWork) {
    const link =
      '../../' +
      path.detailEpisode.replace(':id', item.uuid).replace(':type', path.novel);

    navigate(link);
  }
  useEffect(() => {
    dispatch(searchComicThunk());
  }, [dispatch]);
  if (novelPageable)
    return (
      <WorkList
        onClickCreate={handleClickCreate}
        onClickItem={handleClickItem}
        workPageable={novelPageable}
      />
    );
  return null;
};
export default Novel;
