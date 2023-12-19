import React from "react";
import './App.scss'

class ToDoComponent extends React.Component {
    state = {
        editedContent: this.props.todo.content,
        isEditing: false,
        isChecked: this.props.todo.isComplete,
    }
    changeComplete = (todo) => {
        this.setState({
            isChecked: !this.props.todo.isComplete,
        })
        this.props.handleCheckBox(todo);
    }
    delete = (todo) => {
        this.props.handleDeleteButton(todo);
    }
    openEditableMode = () => {
        this.setState({
            isEditing: true,
        })
    }
    handleTyping = (event) => {
        this.setState({
            editedContent: event.target.value,
        })
    }
    cancelEditing = () => {
        this.setState({
            editedContent: this.props.todo.content,
            isEditing: false,
        })
    }
    saveEditing = (todo, newContent) => {
        this.props.handleSaveButton(todo, newContent);
        this.setState({
            isEditing: false,
        })
    }
    render() {
        let { isEditing, isChecked, editedContent } = this.state
        let { todo } = this.props
        return (
            <div className="Todo">
                <input className="CheckBox-complete" onChange={() => { this.changeComplete(todo) }} type="checkbox" checked={isChecked} />
                <p>{this.props.index + 1}.</p>
                <input
                    readOnly={!isEditing}
                    onChange={(event) => { this.handleTyping(event) }}
                    type="text"
                    className={`TextInput-update 
                          ${this.state.isEditing ?
                            'Todo-content-is-editing' :
                            'Todo-content-is-not-editing'}               
                          ${this.state.isChecked ?
                            'Todo-content-is-completed' :
                            'Todo-content-is-not-completed'}`} value={`${editedContent}`} />
                {!isEditing ?
                    <button className="Button-edit" onClick={() => { this.openEditableMode() }} >Edit</button> :
                    <button className="Button-save" onClick={() => { this.saveEditing(todo, editedContent) }}>Save</button>}
                {!isEditing ?
                    <button className="Button-delete" onClick={() => { this.delete(todo) }}>Delete</button> :
                    <button className="Button-cancel" onClick={() => { this.cancelEditing() }}>Cancel</button>}
                <hr />
            </div>
        )
    }
}
export default ToDoComponent;