import { Button, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import FileBase64  from 'react-file-base64'
import {useDispatch} from 'react-redux'
import { creatPost } from '../../actions/posts'
import './styles.css'
const Forms = () => {
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' })
  const  handleSubmit = (e) => { 
    e.preventDefault()
   dispatch(creatPost(postData))
   clear();
  }
  const clear = () =>{ setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });}
  return (
    <Paper className='paper'> 
      <form onSubmit={handleSubmit} autoComplete='off' className='form'>
        <Typography variant='h6'>Creating a Memory</Typography>
        <TextField name='creator' variant='outlined' label='Creator' fullWidth value={postData.creator} onChange={ (e)=>setPostData({...postData, creator: e.target.value}) }/>
        <TextField name='title' variant='outlined' label='Title' fullWidth value={postData.title} onChange={(e)=>setPostData({...postData,title: e.target.value})} />
        <TextField name='message' variant='outlined' label='Message' fullWidth value={postData.message} onChange={(e)=>setPostData({...postData,message: e.target.value})} />
        <TextField name='tags' variant='outlined' label='Tags' fullWidth value={postData.tags} onChange={(e)=>setPostData({...postData,tags: e.target.value})} />
        <div className='fileInput'>
          <FileBase64 type="file" multiple={false} onDone={ ({base64})=>setPostData({...postData,selectedFile: base64}) }/>
        </div>
        <Button className='buttonSubmit' variant='contained' color='primary' size='large' fullWidth type='submit'>Submit</Button>
        <Button variant='contained' color='secondary' size='small' fullWidth onClick={clear}>Clear</Button>
      </form>
    </Paper>
  )
}

export default Forms