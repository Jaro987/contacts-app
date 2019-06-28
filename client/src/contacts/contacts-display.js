import React from 'react';
import './contacts-display.css';

//const contacts = require('./data.js');

class ContactDisplay extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			contacts: []
		};
	}
    componentDidMount() { 
        fetch('/api/contacts')
        .then( response => response.json())
        .then(
            // handle the result
            (result) => {
                
                this.setState({
                    isLoaded : true,
                    contacts : result
                });
            },

            // Handle error 
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                })
            },
        )
        //Zasto je posts prazan?
        
    }

	render() {
        console.log("render", this.state.contacts);
        const rows = this.state.contacts.map((post,index) => {
            return(
                <tr key={index}>
                    <td>{post.firstName}</td>
                    <td>{post.lastName}</td>
                    <td>{post.email}</td>
                    <td>
                        <button>Edit</button>
                        <button>Delete</button>
                    </td>
                </tr>
                )
        });  
        const {error, isLoaded, contacts} = this.state;
        if(error){
            return <div>Error in loading</div>
        }else if (!isLoaded) {
            return <div>Loading ...</div>
        }else{
            return(
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </div>

            );
        }  
        
    }
}

export default ContactDisplay;