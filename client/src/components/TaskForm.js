import { useState, useEffect } from 'react';
import {
    Button,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    TextField,
    Typography
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const TaskForm = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [loading, setLoading] = useState(false);
    const [task, setTask] = useState({
        title: '',
        description: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await fetch('http://localhost:4000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task)
        });
        const data = await res.json();
        setLoading(false);
        navigate("/");
    }

    const handleChange = e => {
        setTask(prevTask => {
            return {
                ...prevTask,
                [e.target.name]: e.target.value
            }
        });
    }

    const loadTask = async (id) => {
        const res = await fetch(`http://localhost:4000/tasks/${id}`)
        const data = await res.json();
        console.log(data)
        setTask({
            title: data[0].title,
            description: data[0].description
        })
    }

    useEffect(() => {
        if (params.id) {
            loadTask(params.id);
        }
    }, [params.id])

    return (
        <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center">
            <Grid item xs={3}>
                <Card
                    sx={{ mt: 5 }}
                    style={{
                        backgroundColor: '#1e272e',
                        padding: '1rem'
                    }}
                >
                    <Typography
                        variant="h5"
                        textAlign="center"
                        color="#ffffff"
                    >
                        Create Task
                    </Typography>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                name="title"
                                value={task.title}
                                variant="filled"
                                label="Write your title"
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0',
                                    color: '#fff'
                                }}
                                inputProps={{ style: { color: "#fff" } }}
                                InputLabelProps={{
                                    style: {
                                        color: '#fff'
                                    }
                                }}
                                onChange={handleChange}
                            />
                            <TextField
                                name="description"
                                value={task.description}
                                variant='filled'
                                label="Write your description"
                                multiline
                                rows={4}
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0'
                                }}
                                inputProps={{ style: { color: "#fff" } }}
                                InputLabelProps={{
                                    style: {
                                        color: '#fff'
                                    }
                                }}
                                onChange={handleChange}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={!task.title || !task.description || loading}
                            >
                                {loading ? <CircularProgress color="inherit" size={24} /> : "Save"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default TaskForm;