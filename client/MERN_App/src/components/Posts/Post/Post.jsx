import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';

import React from 'react'
import './styles.css'
import moment from 'moment'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch} from 'react-redux'
import { addLike, deltePost, setCurrentPost } from '../../../actions/posts'


const Post = ({post}) => {
  const dispatch = useDispatch();
  return (
    <Card className='card' >
      
      <CardMedia className='media' image={post?.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
      <div className='overlay'> 
          <Typography variant='h6'>{post?.creator}</Typography>
          <Typography variant='body2'>{moment(post?.created).fromNow()}</Typography>
      </div>
      <div className='overlay2'>
        <Button style={{ color: 'white' }} size="small" onClick={() => dispatch(setCurrentPost(post?._id))}><MoreHorizIcon fontSize="default" /></Button>
      </div>
      <div className='details'>
        <Typography variant="body2" color="textSecondary" component="h2">{post?.tags?.map((tag,index)=> <span key={index}>{'#'+tag } </span>)}</Typography>
      </div>
      <Typography className='title' gutterBottom variant="h5" component="h2">{post?.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post?.message}</Typography>
      </CardContent>
      <CardActions className='cardActions'>
        <Button size="small" color="primary" onClick={() =>{dispatch(addLike(post?._id))} }><ThumbUpAltIcon fontSize="small" /> Like {post?.likeCount} </Button>
        <Button size="small" color="primary" onClick={() => {dispatch(deltePost(post?._id))}}><DeleteIcon fontSize="small" /> Delete</Button>
      </CardActions>
    </Card>
  )
}

export default Post