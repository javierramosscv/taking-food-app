const Home = () => (
    <div>
    <h2>Home</h2>
    <p>
     Hablame    </p>

     <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
     <div className="carousel-indicators">
       <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"  aria-current="true" aria-label="Slide 1"></button>
       <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" className="active" aria-label="Slide 2"></button>
       <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
     </div>
     <div className="carousel-inner">
       <div className="carousel-item ">
       <img  src="https://www.animalsaustralia.org/documents/rendered-images/documentsvkrecipesphoto163067thairedcurryfulljpg___343.247_0_0__90.jpg" className="px-3 w-10" alt="..." />
       <img  src="https://www.animalsaustralia.org/documents/rendered-images/documentsvkrecipesphoto119590AAVegKitSobaNoodlesfulljpg___343.247_0_0__90.jpg" className="px-3 w-10" alt="..." />
       <img  src="https://www.animalsaustralia.org/documents/rendered-images/documentsvkrecipesphoto122969AAVegKitSpicyItalianSausagesfulljpg___343.247_0_0__90.jpg" className="px-3 w-10" alt="..." />
       </div>
       <div className="carousel-item active"> 
       <img  src="https://www.animalsaustralia.org/documents/rendered-images/documentsvkrecipesphoto163067thairedcurryfulljpg___343.247_0_0__90.jpg" className="px-3 w-10" alt="..." />
       <img  src="https://www.animalsaustralia.org/documents/rendered-images/documentsvkrecipesphoto119590AAVegKitSobaNoodlesfulljpg___343.247_0_0__90.jpg" className="px-3 w-10" alt="..." />
       <img  src="https://www.animalsaustralia.org/documents/rendered-images/documentsvkrecipesphoto122969AAVegKitSpicyItalianSausagesfulljpg___343.247_0_0__90.jpg" className="px-3 w-10" alt="..." />
   </div>
       <div className="carousel-item">
       <img  src="https://www.animalsaustralia.org/documents/rendered-images/documentsvkrecipesphoto163067thairedcurryfulljpg___343.247_0_0__90.jpg" className="px-3 w-10" alt="..." />
       <img  src="https://www.animalsaustralia.org/documents/rendered-images/documentsvkrecipesphoto119590AAVegKitSobaNoodlesfulljpg___343.247_0_0__90.jpg" className="px-3 w-10" alt="..." />
       <img  src="https://www.animalsaustralia.org/documents/rendered-images/documentsvkrecipesphoto122969AAVegKitSpicyItalianSausagesfulljpg___343.247_0_0__90.jpg" className="px-3 w-10" alt="..." />
   </div>
     </div>
     <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
       <span className="carousel-control-prev-icon" aria-hidden="true"></span>
       <span className="visually-hidden">Previous</span>
     </button>
     <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
       <span className="carousel-control-next-icon" aria-hidden="true"></span>
       <span className="visually-hidden">Next</span>
     </button>
   </div>

  </div>
);

export default Home;