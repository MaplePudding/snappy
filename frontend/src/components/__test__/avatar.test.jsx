import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Avatar } from '../avatar';
import { apiSetAvatar } from '../../http/api';

const USERINFO =
  '{"username":"admin4","email":"admin4@gmail.com","password":"$2a$10$XLY9dqwgIIPID5YFl148Iu.vxWxtvRmhzMXjAUZ.7DelQKeoNWm8e","isAvatarImageSet":false,"avatarImage":"image","_id":"625ad8d30b9d917e22b19ba6","__v":0}';

jest.mock('../../http/api', () => ({
  __esModule: true,
  apiGetAvatar: jest.fn(
    () =>
      new Promise((resolve, reject) => {
        resolve({
          data: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 231 231"><path d="M33.83,33.83a115.5,115.5,0,1,1,0,163.34,115.49,115.49,0,0,1,0-163.34Z" style="fill:#104c8c;"/><path d="m115.5 51.75a63.75 63.75 0 0 0-10.5 126.63v14.09a115.5 115.5 0 0 0-53.729 19.027 115.5 115.5 0 0 0 128.46 0 115.5 115.5 0 0 0-53.729-19.029v-14.084a63.75 63.75 0 0 0 53.25-62.881 63.75 63.75 0 0 0-63.65-63.75 63.75 63.75 0 0 0-0.09961 0z" style="fill:#f7c1a6;"/><path d="M61.11,205.59l3.49,3.69-6.26,6.6A115.45,115.45,0,0,0,72,222.51v-22a115.19,115.19,0,0,0-10.85,5.1Z" style="fill:#efedee;"/><path d="M93.24,228.85V199l-4-4A114.43,114.43,0,0,0,72,200.49v22a114.43,114.43,0,0,0,21.28,6.34Z" style="fill:#00a1e0;"/><path d="m159 222.51v-22a114.63 114.63 0 0 0-17.25-5.51l-4 4v29.86a114.16 114.16 0 0 0 21.25-6.35z" style="fill:#00a1e0;"/><path d="m169.89 205.59-3.49 3.69 6.26 6.6a115.45 115.45 0 0 1-13.66 6.63v-22a115.19 115.19 0 0 1 10.85 5.1z" style="fill:#efedee;"/><path d="M115.5,219.62A28.5,28.5,0,0,1,87.25,195c2.93-.74,5.92-1.36,8.94-1.87a19.41,19.41,0,0,0,38.62,0c3,.51,6,1.13,8.94,1.87a28.49,28.49,0,0,1-28.25,24.63Z" style="fill:#ffce1c;"/><path d="m52.107 57.293c-1.3411 14.839-3.8707 52.771 1.3145 72.715-0.67572-43.829 12.389-70.177 62.078-70.187 49.689 0.010061 62.754 26.359 62.078 70.187 5.1852-19.944 2.6556-57.876 1.3145-72.715h-63.393-63.393z" style="fill:#ffe900;"/><path d="m52.339 30.629c-1.3825 24.448-2.1216 45.905-1.4497 66.517 9.4643-48.304 112.77-54.916 129.22 0 0.67191-20.612-0.3798-47.256-1.4928-66.517-32.241 14.296-91.346 18.861-126.28 0z" style="fill:#ffe900;"/><path d="m115.5 24.92c-22.25 0-44.5 4.2296-56.72 12.69-3.32 2.3-5.0602 6.4392-5.5903 10.269-0.45275 3.23-0.84043 6.7561-1.1785 10.461h126.98c-0.33704-3.7047-0.72492-7.2306-1.1775-10.461-0.53009-3.8301-2.2697-7.9992-5.5897-10.269-12.22-8.4601-34.47-12.69-56.72-12.69z" style="fill:none;"/><path d="m76.521 39.139c21.233 3.3965 33.116-13.392 37.59-31.72 4.3614 17.158 14.175 34.968 36.577 31.584-33.921 20.594-57.646 11.594-74.167 0.1345z" style="fill:#ffe900;"/><path d="m83.527 103.98v10h10v-10h-10zm53.945 0v10h10v-10h-10z" style="fill:#000;"/><path d="m56.621 94.906v11.688h5.3418v6.4922h5.3418v6.1055h5.3223v6.2324h26.846v-6.2324h5.3047v-6.1055h5.1445v-6.0039h11.154v6.0039h5.1446v6.1055h5.3066v6.2324h26.846v-6.2324h5.3203v-6.1055h5.3438v-6.4922h5.3418v-11.688z" style="fill:none;"/><path d="m67.387 100.65v5.9394h5.1992v-5.9394zm5.1992 5.9394v6.4922h5.4238v-6.4922zm5.4238 0h5.1992v-5.9394h-5.1992zm5.1992 0v6.4922h5.4258v-6.4922zm5.4258 6.4922v6.1055h5.1426v-6.1055zm-10.625 0v6.1055h5.1445v-6.1055zm48.281-12.432v5.9394h5.1992v-5.9394zm5.1992 5.9394v6.4922h5.4238v-6.4922zm5.4238 0h5.1992v-5.9394h-5.1992zm5.1992 0v6.4922h5.4258v-6.4922zm5.4258 6.4922v6.1055h5.1426v-6.1055zm-10.625 0v6.1055h5.1445v-6.1055z" style="fill:none;"/><path d="m123.07 154.05a10.61 10.61 0 0 1-15 0.14l-0.14-0.14" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:6.3px;stroke:#000;"/><path d="m120.1 142.22 0.19-0.11c3-1.87 5.45-2.4 7.3-1.46 2.15 1.1 3.12 3.84 4.84 5.5a5.18 5.18 0 0 0 6.68 0.73m-28.21-4.66-0.19-0.11c-3-1.87-5.45-2.4-7.3-1.46-2.15 1.1-3.12 3.84-4.84 5.5a5.18 5.18 0 0 1-6.68 0.73" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:5.9998px;stroke:#4d4d4d;"/></svg>',
    });
  ),
  apiSetAvatar: jest.fn(() => ({
    isSet: true,
  })),
}));

describe('Avatar Component Test', () => {
  test('Basic Structure', () => {
    localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, USERINFO);
    render(
      <BrowserRouter>
        <Avatar />
      </BrowserRouter>,
    );

    waitFor(() => {
      expect(
        screen.queryByText('Pick an Avatar as your profile picture'),
      ).toBeTruthy();
      expect(screen.queryAllByAltText('avatar')).toHaveLength(4);
      expect(screen.queryAllByText('Set as Profile Picture')).toBeTruthy();

      fireEvent.click(screen.queryAllByAltText('avatar')[0]);

      expect(screen.queryAllByAltText('avatar')[0]).toHaveStyle(
        'border-top-width: 0.4rem',
      );
    });
  });

  test('Select Avatar', () => {
    localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, USERINFO);
    render(
      <BrowserRouter>
        <Avatar />
      </BrowserRouter>,
    );
    waitFor(() => {
      fireEvent.click(screen.queryAllByText('Set as Profile Picture'));

      expect(apiSetAvatar).not.toBeCalled();
      expect(screen.queryByText('Please select an avatar')).toBeTruthy();

      fireEvent.click(screen.queryAllByText('Set as Profile Picture'));

      expect(apiSetAvatar).toBeCalled();

      expect(
        JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
          .isSet,
      ).toBeTruthy();
    });
  });

  test('Navigate To Login', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<div>login</div>} />
          <Route path="/" element={<Avatar />} />
        </Routes>
      </BrowserRouter>,
    );

    waitFor(() => {
      expect(screen.queryByText('login')).toBeTruthy();
    });
  });
});
