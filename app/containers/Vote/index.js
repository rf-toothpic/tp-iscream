/**
 *
 * Vote
 *
 */

import React, { memo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { useInjectSaga } from "utils/injectSaga";
import { useInjectReducer } from "utils/injectReducer";
import makeSelectVote from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";

export function Vote() {
  useInjectReducer({ key: "vote", reducer });
  useInjectSaga({ key: "vote", saga });

  return (
    <div>
      <Helmet>
        <title>Vote</title>
        <meta name="description" content="Description of Vote" />
      </Helmet>


    </div>
  );
}

Vote.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  vote: makeSelectVote()
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

export default compose(
  withConnect,
  memo
)(Vote);
