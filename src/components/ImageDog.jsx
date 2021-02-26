import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {compose} from "redux";
import {fetchDog} from "../redux/imgdog-reducer";
import Preloader from "../Common/Preloader";

const ImageDog = (props) => {
    return (
      <div className='todo' style={{textAlign: "center", display: "block"}}>
        Pet Gallery
        <button style={{alignSelf: "center", display: "block", margin: '0 auto'}} onClick={() => props.fetchDog()}>Show Next Dog</button>
        {props.loading
          ? <p><Preloader /></p>
          : props.error
            ? <p>Error, try again</p>
            : <div><img style={{height: '450px'}} src={props.url} /></div>}
      </div>
    )
}

let mapStateToProps = (state) => ({
  url: state.reducerImageDog.url,
});


export default compose(
  connect(mapStateToProps, {fetchDog}),
    withRouter
)(ImageDog);
