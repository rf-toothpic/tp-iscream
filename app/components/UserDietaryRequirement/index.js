/**
 *
 * UserDietaryRequirement
 *
 */

import React, { memo } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function UserDietaryRequirement({ users }) {
  const problem_users = users.filter(user => user.dietary_requirements.length > 0)
  return (
    <Table >
      <TableHead>
        <TableRow>
          <TableCell>Nickname</TableCell>
          <TableCell align="left">Dietary Requirements.</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {problem_users.map(item => (
          <TableRow key={item.nickname} rowSpan={item.dietary_requirements.length}>
            <TableCell>{item.email}</TableCell>
            {item.dietary_requirements.map(diet_req => (
              <TableCell>{diet_req}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

UserDietaryRequirement.propTypes = {};

export default memo(UserDietaryRequirement);
