const baseURL = "https://pixabay.com/api/";
const API_KEY = process.env.API_KEY
console.log(API_KEY);
export const getTrendingImage = async ()=> {
    try {
    const res = await fetch(`${baseURL}/photos?per_page=30`,{
        headers: {
            Authorization:`Client-ID ${API_KEY}`
        }
    });
    if (!res.ok){
       console.error("failed",res.status);
       return;
    }
    const json = await res.json();
    // console.log(json);
    return json;
}   catch (error){
    console.log("error in making",error);
}
};
