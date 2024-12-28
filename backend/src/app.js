import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan'

const app = express();
app.use(cors(
    {
        origin: ['http://localhost:5173', 'https://mern-todo-application-wgj4.vercel.app'],
        credentials: true
    }
));


app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'))
app.use(cookieParser())
app.use(morgan('dev'))
import userRouter from './routes/user.routes.js'
import todoRouter from './routes/todo.routes.js'
app.use((req,res,next)=>{
    console.log(res.body)
    next()
})
app.use('/api/v1/users',userRouter);
app.use('/api/v1/todos',todoRouter);

export {app}
