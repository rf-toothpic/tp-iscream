/**
 *
 * DietaryRequirements
 *
 */

import React from "react";
import UserDietaryRequirement from 'components/UserDietaryRequirement'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { useUsersList } from 'services/API/hooks'
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { useInjectReducer } from "utils/injectReducer";
import makeSelectDietaryRequirements from "./selectors";
import reducer from "./reducer";

export function DietaryRequirements() {
  useInjectReducer({ key: "dietary-requirements", reducer });

  const [users] = useUsersList({})

  return (
    <div>
      <Helmet>
        <title>DietaryRequirements</title>
        <meta name="description" content="Description of DietaryRequirements" />
      </Helmet>
        <UserDietaryRequirement users={users} />
    </div>
  );
}

DietaryRequirements.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  dietaryRequirements: makeSelectDietaryRequirements()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(DietaryRequirements);
