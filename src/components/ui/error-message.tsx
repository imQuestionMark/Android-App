import { type FieldError } from 'react-hook-form';

import { Typography } from './text';

export const ErrorMessage = ({ error }: { error?: FieldError }) => {
  return (
    error && (
      <Typography weight={600} color="error" className="mt-2 text-sm ">
        {error.message}
      </Typography>
    )
  );
};
