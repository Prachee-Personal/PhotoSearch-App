import React,{Component} from 'react';
import axios from 'axios';
import ImageResult from "./ImageResult/ImageResult";
class Search extends Component{
    state={
        searchText:'',
        apiUrl:'https://pixabay.com/api',
        apiKey:'17241914-90da7b93c0ccceb734849dcd1',
        images:[]
    };

    imagesArray = [];
    componentDidMount() {
        console.log("I am called")
        this.callInitialImageAPI('Blossom').then( response => {
            console.log("The response is: " + response)
            this.setState({images: this.imagesArray}); 
            console.log("the result is  :: ",this.state.images)     
        });
    }

    callInitialImageAPI(imageSearchText) {
        return new Promise((resolve, reject) => {
            axios.get(
                `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${
                    imageSearchText
                }&image_type=photo&safesearch=true`
            )
            .then(res=>{
                console.log(res.data.hits)
                // this.imagesArray.concat(res.data.hits)
                this.imagesArray = [...this.imagesArray, ...res.data.hits]
                resolve(this.imagesArray)
            })
            .catch(err=>{
                console.log(err);
                reject(err);
            });
        });
    }

    onTextChange=(e)=>{
        const val=e.target.value;
        this.setState({[e.target.name]:val},()=>{
            if(val==='')
            {
                this.setState({images:this.imagesArray});
            }
            else{
            axios
            .get(
                `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${
                    this.state.searchText
                }&image_type=photo&safesearch=true`
            )
            .then(res=>this.setState({images:res.data.hits}))
            .catch(err=>console.log(err));
            }
        });
    };
    render(){
        console.log(this.state.images);
        return(
            <center>
            <input type="text" 
        placeholder="Search for images"
        name="searchText"
        value={this.state.searchText}
        onChange={this.onTextChange}
             />
<br />
{this.state.images.length>0?(<ImageResult images={this.state.images}/>):null}
            </center>

        )
    }
}



export default Search;