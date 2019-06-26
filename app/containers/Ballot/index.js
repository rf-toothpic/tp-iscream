/**
 *
 * Ballot
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
import makeSelectBallot from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";

export function Ballot() {
  useInjectReducer({ key: "ballot", reducer });
  useInjectSaga({ key: "ballot", saga });

  return (
    <div>
      <Helmet>
        <title>Ballot</title>
        <meta name="description" content="Description of Ballot" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

Ballot.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  ballot: makeSelectBallot()
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
)(Ballot);
