import './App.css';
import React, { useState, useEffect, Fragment } from "react";
import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input} from 'reactstrap'
import axios from "axios";

/*MODALS*/


/*COMPONENTS*/

function KUser(props){
  const [user, setUser] = useState({})
  useEffect(()=>{
    axios.get('http://localhost:8000/api/users/'+props.userid+'/').then((resp)=>{
      setUser(resp.data)
    });
  },[user,props]);

  return(
    <label className='user' key={user.id}>{user.name}</label>
  );
}

function KTask(props){
  const [tasks, setTasks] = useState([])
  useEffect(() => {
    const apiUrlT = 'http://localhost:8000/api/tasks/';
    axios.get(apiUrlT).then((tasks) => {
      setTasks(tasks.data);
    });   
  },[tasks]);

  return(
    tasks.map(task => {
      if(props.columnid === task.column){
        return(
          <div className='task' draggable='true' key={task.id}>
            <div className='task-user'>
            <KUser userid={task.user}/>
            </div>
            <div className='task-desc'>
              {task.description}
            </div>
          </div>
        )
      }
    })
  );
}


function KColumn(){
  const [columns, setColumns] = useState([])
  const [modalc, setModalc] = useState(false)
  useEffect(()=>{
    const apiUrlC = 'http://localhost:8000/api/columns/'
    axios.get(apiUrlC).then((cols) => {
      setColumns(cols.data);
    });
  },[columns]);
  
  const toggle = () =>{
    setModalc(!modalc);
  };
  const createTask = () =>{
    const apiUrlT = 'http://localhost:8000/api/tasks/';
    axios.post(apiUrlT, {
      /*Aqui va la nueva task*/
    })
  };
 
  return(
    columns.map(column => (
    <div className='column'>  
      <div className='column-title'>
        {column.name}
      </div> 

      <div className='col-tools'>
        <button className='add-task'>+</button>
      </div>

      {/*<Fragment>
        <Modal isOpen={modalc} toggle={toggle()}>
          <ModalHeader toggle={toggle()}>
            Ingrese la nueva tarea
          </ModalHeader>
          <ModalBody toggle={toggle()}>
            <Form>
              <FormGroup>
                <Label for='task-user'>Usuario</Label>
                <select id='task-user'>

                </select>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </Fragment>
    */}
      <div className='task-grid'>
        {/*Aqui van las tareas*/}
        <KTask columnid={column.id}/>
      </div>
    </div>

    ))
  );
}

function KBoard(){
  return(
    <div className='board'>
      <div className='title'>
        <h2>Tabla</h2>
      </div>

      <div className='column-flex'>
        {/* Aqui van las columnas */}
        <KColumn/>
      </div>
    </div>
  );
}


function App() {
  return (
    <div>
      Yipi
      <KBoard/>
    </div>
  );
}

export default App;
