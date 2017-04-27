import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import YTSearch from 'youtube-api-search';

// Youtube API Key
const API_KEY = 'AIzaSyDyZnqTKwfX4iiZU8BBoxbhCP6jl96AgjY';

// Create a new component to procude some HTML
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };

        // Life is hard, so ist javascript and React. we need some motivation to start with. Go ahead and by default listen some weird motivation videos :P
        this.videoSearch('motivation');
    }

    // searching video on term
    videoSearch(term) {
        YTSearch({
            key: API_KEY,
            term: term
        }, (videos) => {
            this.setState({videos: videos, selectedVideo: videos[0]});
        });
        // this.setState({videos: videos})
    }

    // passing the videosearch on term change
    render() {
        // Throttling the search term witn debounce method from loadsh,
        const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);
        return (
        <div> 
            <SearchBar onSearchTermChange={term => this.videoSearch(term)}/> 
            <VideoDetail video = { this.state.selectedVideo } /> 
            <VideoList 
                onVideoSelect = { selectedVideo => this.setState({selectedVideo})}
                videos = { this.state.videos } /> 
            </div>
        );
    }
}

// Take this component's generated HTML and put it in to the DOM
ReactDOM.render( <
    App / >, document.querySelector('.container'));