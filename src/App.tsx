import React, { lazy, Suspense, useContext } from 'react';
import MainLayout from 'components/Layouts/MainLayout/MainLayout';
import routes from 'helpers/routes';
import { Redirect, Route, Switch } from 'react-router-dom';
import CustomToaster from 'components/CustomToaster/CustomToaster';
import { CustomToastContext } from 'context/CustomToastContext';
import './App.scss';

const PageNotFound = lazy(() => import('./components/404/PageNotFound'));

const Login = lazy(() => import('pages/Login/Login'));
const Profile = lazy(() => import('pages/Profile/Profile'));
const Home = lazy(() => import('pages/Home/Home'));

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => {
  return <Route {...rest} render={props => (
    <Layout>
      <Component {...props} />
    </Layout>
  )}></Route>
}

const LoginSignupRoute = ({ component: Component, layout: Layout, path: Path, ...rest }) => {
  if (Boolean(localStorage.getItem("token"))) {
    return <Redirect to={routes.home.path} />
  }
  else {
    return <AppRoute {...rest} path={Path} layout={Layout} component={Component} />
  }
}

const PrivateRoute = ({ component: Component, layout: Layout, path: Path, ...rest }) => {
  if (!Boolean(localStorage.getItem("token"))) {
    return <Redirect to={routes.login.path} />
  }
  else {
    return <AppRoute {...rest} path={Path} layout={Layout} component={Component} />
  }
}

const ErrorPagesWrapper = ({ component: Component, ...rest }) => {
  return <Suspense fallback={<div>Loading...</div>}>
    <Component {...rest} />
  </Suspense>
}

function App() {
  const toast = useContext(CustomToastContext);

  return (
    <>
      <Switch>
        <AppRoute exact path={routes.home.path} layout={MainLayout} component={Home} />

        <LoginSignupRoute exact path={routes.login.path} layout={MainLayout} component={Login} />

        <PrivateRoute exact path={routes.profile.path} layout={MainLayout} component={Profile} />

        <ErrorPagesWrapper path="*" component={PageNotFound} />
      </Switch>

      {toast?.toastConfig?.show && (
        <CustomToaster
          type={toast.toastConfig.type}
          message={toast.toastConfig.message}
          show={toast.toastConfig.show}
        />
      )}
    </>
  );
}

export default App;
