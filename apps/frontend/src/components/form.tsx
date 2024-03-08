import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setFormData, setUserId } from '../slices';
import { Button, Grid, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { omit } from 'lodash';

interface FormData {
  username: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const Form = () => {
  const dispatch = useDispatch();

  const { username, phone, password, confirmPassword } = useSelector((state: RootState) => state.form);

  const onSubmit = async (data: FormData) => {
    dispatch(setFormData(data));
    try {
      const { data: id } = await axios.post('http://localhost:3000/api/createUser', omit(data, ['confirmPassword']));
      dispatch(setUserId(id))
    } catch(err) {
      console.error(err)
    }
  };

  const { control, handleSubmit, formState: { errors }, getValues } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      username,
      phone,
      password,
      confirmPassword
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            name="username"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                {...field}
                error={Boolean(errors.username)}
                helperText={errors.username && errors.username.message}
              />
            )}
            rules={{ required: 'Username is required', maxLength: { value: 32, message: 'Username must be up to 32 characters' } }}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="Phone"
                variant="outlined"
                fullWidth
                {...field}
                error={Boolean(errors.phone)}
                helperText={errors.phone && errors.phone.message}
              />
            )}
            rules={{ required: 'Phone number is required', maxLength: { value: 10, message: 'Phone number must be up to 10 digits' }, pattern: { value: /^\d*$/, message: 'Phone number must contain only digits' } }}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                {...field}
                error={Boolean(errors.password)}
                helperText={errors.password && errors.password.message}
              />
            )}
            rules={{
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters long' },
              maxLength: { value: 12, message: 'Password must be at most 12 characters long' },
              pattern: { value: /^(?=.*[A-Z])(?=.*[!@#$%^&*]).*$/, message: 'Password must include at least one uppercase letter and one special character' }
            }}          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="Confirm Password"
                variant="outlined"
                type="password"
                fullWidth
                {...field}
                error={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword && errors.confirmPassword.message}
              />
            )}
            rules={{ required: 'Confirm password is required', validate: value => value === getValues('password') || 'Passwords do not match' }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default Form