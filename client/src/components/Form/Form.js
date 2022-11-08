import React, { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';

import { createNote } from '../../actions/notes';
import useStyles from './styles'


const Form = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    // hooks
    const [noteData, setNoteData] = useState({
        name:'',
        class:'',
        description:'',
        selectedFile:'',
    });


    // button functionally 
    const handleSubmit = (event) => {
        event.preventDefault(); 
        dispatch(createNote(noteData))
    }

    // implement form clear
    const clear = () => {
        setNoteData({
            name:'',
            class:'',
            description:'',
            selectedFile:'',
        })

    }

    return(
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h3">Post a New Note</Typography>
                <TextField name="name" variant='outlined' label='name' fullWidth 
                    value={noteData.name}      onChange={(e) => setNoteData(       {...noteData, name:e.target.value}) }/>
                
                <div className={classes.fileInput}>
                    <FileBase
                        type='file' multiple={false}
                        onDone={({base64}) => setNoteData({...noteData, selectedFile:base64})}
                    />
                </div>

                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;