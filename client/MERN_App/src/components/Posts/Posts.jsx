import React from 'react'
import { useSelector } from 'react-redux'
import Post from './Post/Post'
import './styles.css'
import { Grid,CircularProgress } from '@mui/material'

const Posts = () => {
  const posts = useSelector((state) => state.posts);

  console.log(posts)
  return (
    !posts.length ? <CircularProgress /> : (
      <Grid className='mainContainer' container alignItems="stretch" spacing={3}>
        {
          posts.map((post) =>(
            <Grid key={post?._id} item xs={12} md={6}>
              <Post post={post}/>
            </Grid>
          ))
        }
      </Grid>
    )
   
  )
}

export default Posts