import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./Home.css";



const Home = (props) => {
  const history = useHistory();
  const params = useParams();
  const [catMealImgList, setCatMealImgList] = useState([]);

  const style = {
    "maxWidth": "20rem",
  };

 
  const buildCard = (categoryList, init, end,path) => {
    console.log("card",categoryList)

     return categoryList.map((item,index) => {
      if (item.id >= init && item.id <= end) {
        return (
          <div key={index} className="col-sm-3" onClick ={ () =>{ props.setLoading(true); history.push(`/${path}/c/${item.name}`)} }>
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

  const buildCard2 = (categoryList, init, end,path) => {
    console.log("card",categoryList)

     return categoryList.map((item,index) => {
      if (item.id >= init && item.id <= end) {
        return (
          <div key={index} className="col-sm-3" onClick ={ () =>{ props.setLoading(true); history.push(`/${path}/c?query=${item.name}`)} }>
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
      {console.log('jarss',props.categoryMealList) }
      {Object.keys(props.categoryMealList).length !== 0 ? (
         <div>
           <div
            id="carouseltakeing"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouseltakeing"
                data-bs-slide-to="0"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouseltakeing"
                data-bs-slide-to="1"
                className="active"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouseltakeing"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>

            <div className="carousel-inner">
              
            <div className="carousel-item active ">
                <div className="row justify-content-center ">
                  
                {buildCard(props.categoryMealList,0,2,"searchMealCategory")}
              
                </div>
              </div>
              <div className="carousel-item ">
                <div className="row justify-content-center ">
                 
                {buildCard(props.categoryMealList,3,5,"searchMealCategory")}

                </div>
              </div>

              <div className="carousel-item ">
                <div className="row justify-content-center ">
                 
                {buildCard(props.categoryMealList,6,8,"searchMealCategory")}
                
                  </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouseltakeing"
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
              data-bs-target="#carouseltakeing"
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

     
      {Object.keys(props.categoryDrinkList).length !== 0 ? (
        <div>
          <div
           id="carouseltakeingDrinks"
           className="carousel slide"
           data-bs-ride="carousel"
         >
           <div className="carousel-indicators">
             <button
               type="button"
               data-bs-target="#carouseltakeingDrinks"
               data-bs-slide-to="0"
               aria-current="true"
               aria-label="Slide 1"
             ></button>
             <button
               type="button"
               data-bs-target="#carouseltakeingDrinks"
               data-bs-slide-to="1"
               className="active"
               aria-label="Slide 2"
             ></button>
             <button
               type="button"
               data-bs-target="#carouseltakeingDrinks"
               data-bs-slide-to="2"
               aria-label="Slide 3"
             ></button>
           </div>

           <div className="carousel-inner">
             
           <div className="carousel-item active ">
               <div className="row justify-content-center ">
                 
               {buildCard2(props.categoryDrinkList,0,2,"searchDrinkCategory")}
             
               </div>
             </div>
             <div className="carousel-item ">
               <div className="row justify-content-center ">
                
               {buildCard2(props.categoryDrinkList,3,5,"searchDrinkCategory")}

               </div>
             </div>

             <div className="carousel-item ">
               <div className="row justify-content-center ">
                
               {buildCard2(props.categoryDrinkList,6,8,"searchDrinkCategory")}
               
                 </div>
             </div>
           </div>
           <button
             className="carousel-control-prev"
             type="button"
             data-bs-target="#carouseltakeingDrinks"
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
             data-bs-target="#carouseltakeingDrinks"
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
