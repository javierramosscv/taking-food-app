import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./Home.css";



const Home = (props) => {
  const history = useHistory();
  const params = useParams();
  const [catMealImgList, setCatMealImgList] = useState([]);

  const style = {
    "max-width": "20rem",
  };

 
  const buildCard = (categoryList, init, end) => {
    console.log("card",categoryList)

     return categoryList.map((item) => {
      if (item.id >= init && item.id <= end) {
        return (
          <div className="col-sm-3" onClick ={ () => history.push(`/searchMealCategory/${item.name}`) }>
                    <div className="card  mb-1" style={style}>
                      <div className="card-header"></div>
                      <div className="card-body">
                       <h4 className="card-title">{item.name}</h4>
                        <img src={item.path} className="card-img" alt="..." />
                      </div>
                    </div>
                  </div>
        )
       
      }
    });
  };

  return (
    <div>
      <h2>Home</h2>

      {Object.keys(props.categoryMealList).length !== 0 ? (
        <div>
          
        {console.log('jarss',props.categoryMealList)
      
       }
      

  

          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                className="active"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>

            <div className="carousel-inner">
              
            <div className="carousel-item active ">
                <div className="row justify-content-center ">
                  
                {buildCard(props.categoryMealList,0,2)}
              
                </div>
              </div>
              <div className="carousel-item ">
                <div className="row justify-content-center ">
                 
                {buildCard(props.categoryMealList,3,5)}

                </div>
              </div>

              <div className="carousel-item ">
                <div className="row justify-content-center ">
                 
                {buildCard(props.categoryMealList,6,8)}
                
                  </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      ) : (
      
        <p>Loading results...</p>
      )}
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>

    </div>
  );
};
export default Home;
