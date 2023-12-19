import React from 'react';
import ToDoComponent from './ToDoComponent';
import './App.scss'
import { toast } from 'react-toastify';

class MainComponent extends React.Component {
    state = {
        content: '',
        toDoList: [
            { id: '0', content: 'Respond to urgent emails and messages by 9 AM.', isComplete: false },
            { id: '1', content: 'Attend team meeting at 10 AM.', isComplete: false },
            { id: '2', content: 'Work on client proposal from 11 AM to 1 PM', isComplete: true },
            { id: '3', content: 'Lunch break at 1 PM.', isComplete: true },
            { id: '4', content: 'Review and finalize presentation slides in the afternoon.', isComplete: false },
        ],
    }
    handleCheckBox = (todo) => {
        const index = this.state.toDoList.indexOf(todo);
        if (index === -1) return;
        let newToDoList = this.state.toDoList;
        newToDoList[index] = {
            id: todo.id,
            content: todo.content,
            isComplete: !todo.isComplete
        }
        this.setState({
            toDoList: newToDoList,
        })

    }
    handleTyping = (event) => {
        this.setState({
            content: event.target.value,
        })
    }
    handleAddButton = () => {
        if (!this.state.content) {
            toast.error('Please type a new content!!!');
            return;
        }
        let newtodo = {
            id: Math.floor(Math.random() * 2003),
            content: this.state.content,
            isComplete: false,
        }
        this.setState({
            toDoList: [...this.state.toDoList, newtodo],
            content: '',
        })
        toast.success('New content added.');

    }
    handleDeleteButton = (todo) => {
        const index = this.state.toDoList.indexOf(todo);
        if (index === -1) return;
        let newToDoList = this.state.toDoList;
        newToDoList.splice(index, 1);
        this.setState({
            toDoList: newToDoList,
        })
        toast.success('A content has been deleted.');
    }
    handleSaveButton = (todo, newContent) => {
        const index = this.state.toDoList.indexOf(todo);
        if (index === -1) return;
        const newToDoList = this.state.toDoList.map(o => o === todo ? { ...todo, content: newContent } : o);
        this.setState({
            toDoList: newToDoList,
        })
        toast.success('A content has been updated.');
    }
    render() {
        let { content } = this.state;
        return (
            <>
                <div>
                    <p className='App-title'>TO DO APP</p>
                </div>
                <div className='Secsion-1'>
                    <input placeholder='Input content here' className='TextInput-new' type='text' onChange={(event) => { this.handleTyping(event) }} value={content}></input>
                    <button className='Button-add' onClick={() => { this.handleAddButton() }}>+</button>
                </div>
                <div className='To-do-list'>
                    {this.state.toDoList && this.state.toDoList.length > 0 &&
                        this.state.toDoList.map((item, index) => {
                            return (
                                <div key={item.id}>
                                    <ToDoComponent index={index} todo={item} handleCheckBox={this.handleCheckBox} handleDeleteButton={this.handleDeleteButton} handleSaveButton={this.handleSaveButton} />
                                </div>
                            )
                        })
                    }
                </div>
            </>
        )
    }
}
export default MainComponent;