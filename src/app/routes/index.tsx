import { Navigate, useRoutes } from 'react-router';
import MainPage from 'app/pages/Main/Loadable';
import Layout from 'app/pages/Layout';
import { RedirectRouter } from 'app/components/HOC/RedirectRouter';
import Novel from 'app/pages/Main/Novel/Loadable';
import Comic from 'app/pages/Main/Comic/Loadable';
import MyPage from 'app/pages/MyPage/Loadable';
import CreateWork from 'app/pages/Main/Create/Loadable';
import NoticeForm from 'app/pages/NoticeForm/Loadable';
import UpdateWork from 'app/pages/Main/Update/Loadable';
import Login from 'app/pages/Auth/Loadable';

import { path } from './path';

export default function Routes() {
  return useRoutes([
    { path: path.all, element: <Navigate to={path.home} replace /> },
    { path: path.login, element: <Login /> },
    {
      path: path.home,
      element: <Layout />,
      children: [
        {
          path: path.home,
          element: <MainPage />,
          children: [
            { path: path.novel, element: <Novel /> },
            { path: path.comic, element: <Comic /> },
            { index: true, element: <Navigate to={path.novel} replace /> },
          ],
        },

        {
          path: path.updateWork,
          element: <UpdateWork />,
        },

        //

        { path: path.createWork, element: <CreateWork /> },
        { path: path.myPage, element: <MyPage /> },
        { path: path.createNotice, element: <NoticeForm /> },
        { path: path.updateNotice, element: <NoticeForm /> },
      ],
    },

    { path: path.all, element: <Navigate to={path.home} /> },
  ]);
}
