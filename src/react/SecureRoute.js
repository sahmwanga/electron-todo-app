import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isValidUser } from './services';
import AuthPage from './AuthPage';

/**
 * @function
 * @name SecureRoute
 * @description Route which check authentication status and route to appropriate
 *  component
 *
 * @param {object} props  React props
 * @param {object} props.component Component to be rendered
 * @param {object} props.rest rest All remaining props for secure root
 *
 * @returns {object} React Element
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const SecureRoute = ({ component: Component, data, location, ...rest }) => {
  const isAuthenticated = isValidUser();

  /* eslint-disable */

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} {...data} /> : <AuthPage />
      }
    />
  );
  /* eslint-enable */
};

/* props validation */
SecureRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.node,
  ]).isRequired,
  data: PropTypes.objectOf({
    vendor: PropTypes.object,
    loading: PropTypes.bool,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({ token: PropTypes.string }),
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

SecureRoute.defaultProps = {
  data: undefined,
};

export default withRouter(SecureRoute);
