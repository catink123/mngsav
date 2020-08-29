import React from 'react';
import './App.css';
import MangaItem from './components/MangaItem';

class App extends React.Component {
	state = {
		items: [
			{
				name: "О ботинки ебать",
				chapter: 1,
				image: null,
				link: "https://google.com/"
			}
		]
	}

	componentWillMount() {
		// this.setState(JSON.parse(localStorage.getItem("state")))
	}

	componentWillUnmount() {
		localStorage.setItem("state", this.state);
	}

	showNewItemPopup() {
		var name = prompt("Enter name: ", "Name");
		var chapter = parseInt(prompt("Enter current chapter: ", 1));
		var link = prompt("Enter link: ", "https://catink123.github.io/");

		this.setState(
			{
				items: [
					...this.state.items,
					{
						name: name,
						chapter: chapter,
						image: null,
						link: link
					}
				]
			}
		)
		// this.forceUpdate();
	}

	

	render() {
		return (
			<div className="App">
			<button onClick={() => { this.showNewItemPopup() }}>Add</button>
				{this.state.items.map(item =>
					<MangaItem name={item.name} chapter={item.chapter} image={item.image} link={item.link} key={item.name} />
				)}
			</div>
		);
	}
}

export default App;
