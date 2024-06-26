import React from 'react';
import { Grid, Typography } from '@mui/material';

import { TouchpointChip, CompanySettingsForm, CustomDivider, InviteUserForm } from 'components';
import { sessionHooks } from 'hooks';
import { isOwnerRole } from 'utils/util';

export function AdminPage() {
  const { data: role } = sessionHooks.useSessionRole();

  return (
    <Grid container maxWidth={1200} marginX="auto">
      <Grid item xs={12} marginTop="2rem" textAlign="center">
        <Typography fontSize="2rem">Admin Portal</Typography>
      </Grid>

      <Grid container item xs={12} marginBottom="2rem">
        <Grid item xs={1} sm={2} />
        <Grid container item xs={10} sm={8}>
          {/* WRISTBAND_TOUCHPOINT - AUTHORIZATION */}
          {isOwnerRole(role.name) && (
            <>
              <Grid item xs={12}>
                <Typography fontSize="1.5rem" margin="1rem 0 0.5rem">
                  Company
                </Typography>
                <TouchpointChip />
                <CompanySettingsForm />
              </Grid>
              <Grid item xs={12} marginY={2}>
                <CustomDivider />
              </Grid>
              <Grid item xs={12}>
                <Typography fontSize="1.5rem" margin="1rem 0 0.5rem">
                  Invite Admins
                </Typography>
                <TouchpointChip />
                <InviteUserForm />
              </Grid>
            </>
          )}
        </Grid>
        <Grid item xs={1} sm={2} />
      </Grid>
    </Grid>
  );
}
