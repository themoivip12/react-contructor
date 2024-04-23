import { path } from 'app/routes/path';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useAppDispatch } from 'store/configureStore';
import { IWork } from 'types';

import WorkList from '../components/WorkList';
import { searchComicThunk } from '../slice/actions';
import { mainSelector } from '../slice/selector';

const Comic = () => {
  const dispatch = useAppDispatch();
  const { comicPageable } = useSelector(mainSelector);

  useEffect(() => {
    dispatch(searchComicThunk());
  }, []);

  const navigate = useNavigate();

  function handleClickCreate() {
    navigate(path.createWork.replace(':type', path.comic));
  }

  function handleClickItem(item: IWork) {
    navigate(
      '../../' +
        path.detailEpisode
          .replace(':id', item.uuid.toString())
          .replace(':type', path.comic),
    );
  }
  if (comicPageable)
    return (
      <WorkList
        onClickCreate={handleClickCreate}
        onClickItem={handleClickItem}
        workPageable={comicPageable}
      />
    );
  return null;
};
export default Comic;
