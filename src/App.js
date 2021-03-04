import React,{Component} from 'react';
import Search from './components/search/Search';
import Gallery from './components/search/Gallery';
import './App.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component{
    render() {
        return (
            <MuiThemeProvider>
            <div>
                <Search/>
                <Gallery/>
                
            </div>
            </MuiThemeProvider>
        )
    }
}

export default App;