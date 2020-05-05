### ![GA](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png) General Assembly, Software Engineering Immersive

# News and Financial Data App
by  [Gabriel Antonica](https://github.com/bababumBab) and [Kenn Seangpachareonsub](https://github.com/seangpachareonsub)




## Overview
The second project with General Assembly was a 48 hour 'hackathon' to build a multiple-page website using React which consumes one or several public API. This was a pair programming task.

Choosing this theme is a reflection of general interests. We need to be informed, meaning we need to see the latest news that dictate how prices of different crypto currency coins are affected. 

You can view this project [here]([https://placeholder]/)


## Brief
* **Consume a public API** – this could be anything but it must make sense for your project.
* **Have several components** - At least one classical and one functional.
* **The app should include a router** - with several "pages".
* **Include wireframes** - that you designed before building the app.
* Have **semantically clean HTML** - you make sure you write HTML that makes structural sense rather than thinking about how it might look, which is the job of CSS.
* **Be deployed online** and accessible to the public.



## Technologies Used

- HTML5
- JSX
- CSS3
- Bulma
-  SCSS
- JavaScript (ES6)
- React.js
- Webpack
- NPM
- Axios
- [New York Times](https://developer.nytimes.com/apis)
- [Coin Gecko](https://www.coingecko.com/en/api)
- Git and GitHub
- Bulma
- Google Fonts

## Approach

### The Router

The app is utilises the React Router `<BrowserRouter>` to keep the UI in sync with the URL. 

```js
import { BrowserRouter, Switch, Route } from 'react-router-dom'

const App = () => (

  <Router>

    <Switch>

      <Route exact path='/' component={HomePage} />
      <Route exact path='/news' component={NewsPage} />
      <Route exact path='/coins' component={CoinsList} />
      
    </Switch>
  </Router>
)
```


### The NavBar

The Navbar, gives the ability to the user to switch between pages, is continuously rendered on the UI. This searchbar utilises a class component as below:

```js
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='header'>
      <div className='header-container'>
        <Link to='/news'> <li> News </li> </Link>
      </div>

      <div className='header-container'>
        <Link to='/coins'> <li> Market Data </li> </Link>
      </div>
    </header>
  )
}

export default Header
```

### The SearchBar

The SearchBar is another class component which initially sets state as an object with an empty `results` value. 


```js
class SearchBar extends React.Component {

  constructor() {
    super()
    this.state = {
      results: null
    }
  }
```

We then make a call to the [New York Times API]((https://developer.nytimes.com/apis/)), using `axios` and setting the results in state. 

```js
  componentDidMount() {
    axios.get('https://api.nytimes.com/svc/topstories/v2/business.json?api-key=WJACAxScK1FNFg15KpU8rxW9ONYaSc4v')
      .then(response => {
        this.setState({
          mainNews: response.data.results[0], secondaryNews: response.data.results,
          image: response.data.results[0].multimedia[0].url
        })
        // console.log(this.state.secondaryNews)
      })
  }

  changeNews(event) {

    const target = event.target.innerText.toLowerCase().replace(/\s/g, '')
    console.log(target)

    axios.get(`https://api.nytimes.com/svc/topstories/v2/${target}.json?api-key=WJACAxScK1FNFg15KpU8rxW9ONYaSc4v`)
      .then(response => {
        // console.log(response.data)
        this.setState({
          mainNews: response.data.results[0], secondaryNews: response.data.results,
          image: response.data.results[0].multimedia[0].url
        })
      })
  }
```

Because we want the user to be able to consistently make requests via the SearchBar, we utilise the `componentDidUpdate()` method as below:

```js
 componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.getData()
    }
  }
```

This checks the current props passed to the searchBar against the previous props that would have been passed to it and updates the component's state and re-renders accordingly. 

Here is how the page renders when the user searches for an artist in the search bar:

<img src=src/img/Screenshots/DesktopArtists.png width=500> <img src=src/img/Screenshots/PhoneArtists.png height=250>

### Loading

If the data from the API has yet to return and be set in state, then a gif is displayed in the render to indicate loading:

```js
 render() {
    if (!this.state.results) return <Loading />
```

<img src= src/img/vinylspin.gif width= 150>


### Other Class Components 

The other class components `selectedAlbum` and `selectedArtist` are similar to the search bar above. Props are passed to them through the `BrowserRouter` using the unique ID that is provided from the Deezer API. An example is below:

Once a user has searched for an artist, the application maps through each of the returned results and renders a 'card' displaying that artist. Selecting that card will route the user using the unique id of the selected item.

` <Link className="subtitle" to={${results.id}/album}>{results.name}</Link>`

This passes through the router here:

`<Route exact path="/:id/album" component={SelectedArtist} />`

The unique id forms the path and so can be used as the props passed to the api in our request for more information on that specific artist:

```js  
componentDidMount() {
    axios.get(`https://cors-anywhere.herokuapp.com/api.deezer.com/artist/${this.props.match.params.id}/albums`)
      .then(resp => this.setState({ albumResults: resp.data.data }))
      .catch(err => this.setState({ err: err.response.status }))
  } 
```

### Functional Components and Styling

Functional components such as `ChartCard` and `TrackCard` are used to render the information from the API in a visually pleasing way. Due to this being a hackathon, we used the Bulma CSS Framework to keep our layout simple, clean and easily suitable for mobile use. 

An example of the `TrackCard` functional component is below: 

```js
import React from 'react'

const TrackCard = ({ trackResults }) => (
  <div className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">
    <div className='container'>
      <p>{trackResults.track_position}. {trackResults.title_short}</p>
      <div className="card-content">
        <audio src={trackResults.preview} controls />
      </div>
    </div>
  </div>
)
export default TrackCard
```

The `className` is dictated by the Bulma CSS framework whilst the `trackResults` prop is passed from the `selectedAlbum` component.

<img src=src/img/Screenshots/DesktopMenu.png width=500> 

The app makes requests to New York Times and Coin Gecko APIs as below. The function `componentDidMount()`is called immediately after the React component loads. 

```js
  componentDidMount() {
    axios('https://[placeholder]')
      .then(resp => resp.json())
      .then(resp => this.setState({ quotesList: resp }))
  }
```







## Challenges

- Both API's have the information nested under objects. Getting the right information was one of the challenges we had to deal with. Many of the images provided are all of different sizes and quality, that required incresed attention on the containers where the images from the articles would be rendered.



## Successes 

- This is a project which enabled to think about UX and to get to grips with setting up a multiple page app, rendering a components with React and fetching from different APIs and updating state. Happily, all these goals have been achieved.  


## Lessons learned

- Gaining experience in Pair Programming
- Splitting tasks and how to schedule on a tight turnaround

- How to successfully pass props between React Components
- How to update State within the same Component with `componentDidUpdate()`


## Potential future features

- As above, the API was very limited. 
