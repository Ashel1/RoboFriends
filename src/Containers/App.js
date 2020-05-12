import React, {Component} from 'react';
import {connect} from 'react-redux';
import CardList from '../Components/CardList';
import { createLogger } from 'redux-logger';
import SearchBox from '../Components/SearchBox';
import Scroll from "../Components/Scroll";
import ErrorBoundry from "../Components/ErrorBoundry"
import './App.css'
import {setSearchField} from '../Action';

const logger = createLogger();
const mapStateToProps= state =>{
  return{
    searchField: state.searchField
  }
}

const mapDispatchToProps= (dispatch) =>{
 return {OnSearchChange: (event) => dispatch(setSearchField(event.target.value))
}
}

class App extends Component{
    constructor(){
        super()
        this.state = {
          robots: []
        }
    }

    componentDidMount(){
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response=>{
                return response.json();
            })
            .then(users=>{
                this.setState({ robots: users });
            });        
    }

    render(){
      const {robots} = this.state;
      const { searchField, onSearchChange} = this.props;
        const filteredRobots = robots.filter((robot) => {
          return robot.name
            .toLowerCase()
            .includes(searchField.toLowerCase());
        })
        return !robots.length?
        <h1>Loading</h1>:
        (
          <div className="tc">
            <h1 className="f1">ROBOFRIENDS</h1>
            <SearchBox searchChange={onSearchChange} />
            <Scroll>
              <ErrorBoundry>
                <CardList robots={filteredRobots} />
              </ErrorBoundry>
            </Scroll>
          </div>
        );
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(App);