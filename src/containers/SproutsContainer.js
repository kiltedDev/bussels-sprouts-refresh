import React, { Component } from 'react';
import RandomSprout from '../components/RandomSprout';
import SproutsIndex from '../components/SproutsIndex';
import LongestSprout from '../components/LongestSprout'

class SproutsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: "",
      recipes: [],
      longestName: "",
      view: ''
    }
  }

  getRandomRecipe(){
    fetch('http://localhost:4567/api/v1/random-recipe')
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({ recipe: body, view: 'recipe' });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  getAllRecipes(){
    fetch('http://localhost:4567/api/v1/recipes')
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body =>{
        this.setState({ recipes: body, view: 'recipes' });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  getLongestName() {
  fetch('http://localhost:4567/api/v1/longest-name')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body =>{
      this.setState({ longestName: body, view: 'longestName' });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){

    let handleRandomClick = () => {
      this.getRandomRecipe();
    }

    let handleIndexClick = () => {
      this.getAllRecipes();
    }

    let handleLongestNameClick = () => {
      this.getLongestName();
    }

    let show;

    if (this.state.view === 'recipe') {
      show = <RandomSprout
        key='1'
        recipe={this.state.recipe}
      />
    } else if (this.state.view === 'recipes') {
      show = <SproutsIndex
        key='2'
        recipes={this.state.recipes}
      />
    } else if (this.state.view === 'longestName') {
      show = <LongestSprout
        key='3'
        longestName={this.state.longestName}
      />
    } else {
      show = ''
    }

    return(
      <div className="container row">
        <div className="header large-12 column">
          <h2>Sprout Fetcher</h2>
          <br/>
        </div>
        <div className="show">
          {show}
        </div>
        <div className="buttons">
          <button onClick={handleRandomClick} className="btn">Get Random Recipe</button>

          <button onClick={handleIndexClick} className="btn">See All Recipes</button>

          <button onClick={handleLongestNameClick} className="btn">Get Longest Recipe Name</button>
        </div>
      </div>
    )
  }
}

export default SproutsContainer;
