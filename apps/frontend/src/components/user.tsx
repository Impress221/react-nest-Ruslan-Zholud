import { Box, CircularProgress, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import axios from 'axios';

interface IUserData {
  id: string;
  username: string;
  phone: string;
}

const User = () => {
  const id = useSelector((state: RootState) => state.form.userId)
  const [user, setUser] = useState<null | IUserData>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`http://localhost:3000/api/getUser/${id}`);
      setUser(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchUserData();
  }, [])

  if (loading) {
    return <CircularProgress />
  }

  if (!user) {
    return null
  }

  return (
    <Box>
      <Typography variant="body1"><strong>Username:</strong> {user.username}</Typography>
      <Typography variant="body1"><strong>Phone:</strong> {user.phone}</Typography>
    </Box>
  )
}

export default User