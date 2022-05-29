import Posts from "./Posts";

function Home(props){

    return(
        <div>
            <Posts from="all" filter={props.filter}/>
        </div>
    );
}

export default Home;