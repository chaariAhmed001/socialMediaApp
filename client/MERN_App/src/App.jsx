import React, { useEffect } from 'react'
import { AppBar, Container, Grid, Grow, Typography } from '@mui/material';
import Posts from './components/Posts/Posts';
import Forms from './components/Foms/Forms';
import { useDispatch } from 'react-redux'
import './App.css';
import { getPosts } from './actions/posts';
const App = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    //get All posts
    dispatch(getPosts());
  }, [dispatch])
  


  return (
    <Container maxWidth='lg'>
      <AppBar className='appBar' position='static' color='inherit'> 
        <Typography className='heading' variant='h4' align='left'>Memories</Typography>
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justifyContent='space-between' alignItems='stretch' spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Forms />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  )
}

export default App