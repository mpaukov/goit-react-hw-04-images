import { Component } from 'react';
import ImageGallery from './ImageGallery';
import { Searchbar } from './Searchbar';

export class App extends Component {
  state = {
    searchQuery: '',
  };
  handleSubmit = searchQuery => {
    if (this.state.searchQuery !== searchQuery) {
      this.setState({ searchQuery });
    }
    return;
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery query={this.state.searchQuery} />
      </div>
    );
  }
}
