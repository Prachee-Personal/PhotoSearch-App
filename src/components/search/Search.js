import React, { Component} from 'react';
import axios from 'axios';
import ImageResult from "./ImageResult/ImageResult";
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            apiUrl: 'https://pixabay.com/api',
            apiKey: '17241914-90da7b93c0ccceb734849dcd1',
            images: [],
            currentImages: [],
            currentPage: 0,
            imagesPerPage: 10,
        };
        this.handlePageChange = this.handlePageChange.bind(this);
    }



    imagesArray = [];
    componentDidMount() {
        console.log("I am called")
        this.callInitialImageAPI('mountains').then(response => {
            console.log("The response is: " + this.imagesArray)
            this.setState({ images: this.imagesArray.slice(0,this.state.imagesPerPage) }, () => {this.initiatePaginations()});
            console.log("the result is  :: ", this.state.images)
        });
  
    }

    initiatePaginations() {
        this.setState({currentPage: 1});
        document.getElementById("PrevButton").disabled = true;
        console.log("this.state.images.length",this.state.images.length)
        if (this.imagesArray.length <= this.state.imagesPerPage) {
            document.getElementById("NextButton").disabled = true;
        }
    }

    handlePageChange(event, value) {
        document.getElementById("PrevButton").disabled = false;
        if (event.target.id === 'PrevButton') {
            if (this.state.currentPage>1) {
                this.setState({currentPage: this.state.currentPage-1}, () => {
                    this.renderNewPage()
                });
                document.getElementById("NextButton").disabled = false;
            }
        } else {
            if (this.imagesArray.length > this.state.currentPage * this.state.imagesPerPage) {
                this.setState({currentPage: this.state.currentPage+1}, () => {
                    this.renderNewPage()
                });
                document.getElementById("PrevButton").disabled = false;
            }
        }
        

    }

    renderNewPage() {
        this.setState({images: this.imagesArray.slice((this.state.currentPage-1)*this.state.imagesPerPage, this.state.currentPage*this.state.imagesPerPage)});
        if (this.state.currentPage === 1) {
            document.getElementById("PrevButton").disabled = true;
        }
        if (this.imagesArray.length <= this.state.currentPage*this.state.imagesPerPage) {
            document.getElementById("NextButton").disabled = true;
        }
    }

    callInitialImageAPI(imageSearchText) {
        return new Promise((resolve, reject) => {
            axios.get(
                `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${imageSearchText
                }&image_type=photo&safesearch=true`
            ).then(res => {
                    console.log(res.data.hits)
                    this.imagesArray = [...res.data.hits]
                    resolve(this.imagesArray)
                })
                .catch(err => {
                    console.log(err);
                    reject(err);    
                });
        });
    }

    onTextChange = (e) => {
        this.setState({currentPage:1});
        const val = e.target.value;
        this.setState({ [e.target.name]: val }, () => {
            if (val === '') {
                this.componentDidMount();
            }
            else {
                axios
                    .get(
                        `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText
                        }&image_type=photo&safesearch=true`
                    )
                    .then(res => {
                        this.imagesArray = res.data.hits;
                        this.setState({ images: this.imagesArray.slice(0,this.state.imagesPerPage)});
                    })
                    .catch(err => console.log(err));
            }
        });
    };
    render() {
        console.log(this.state.images);
        return (
            <div className="container">
                <div className="row">
                    <div className="col md-12">
                        <h1 className="title">PhotoGallery</h1>
                        <center>
                            <input className="searchbox" 
                            type="text"
                                placeholder="Search For Images"
                                autocomplete="off"
                                name="searchText"
                                value={this.state.searchText}
                                onChange={this.onTextChange}
                            />
                            <br />
                            <button style={{backgroundColor: 'purple', color: 'white',marginRight:'5px',marginBottom:'15px',padding:"8px"}} id="PrevButton" onClick={this.handlePageChange}>Previous</button>
                            <button style={{backgroundColor: 'purple', color: 'white',marginLeft:'5px',marginBottom:'15px',padding:"8px"}} id="NextButton" onClick={this.handlePageChange}>Next</button>
                            {this.state.images.length > 0 ? (<ImageResult images={this.state.images} />) : null}
                        </center>
                    </div>
                </div>
            </div>

        )
    }
}



export default Search;